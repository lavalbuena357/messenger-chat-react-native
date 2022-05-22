import { StatusBar, AppState } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import Theme from './src/colors/colors'
import Splash from './src/screens/Splash/Splash'
import Login from './src/screens/Login/Login'
import Main from './src/screens/Main/Main'
import Rooms from './src/screens/Rooms/Rooms'
import Contacts from './src/screens/Contacts/Contacts'
import { getTheme, userOffline } from './src/redux/actions'
import ChatScreen from './src/screens/ChatScreen/ChatScreen'
import ContactDetail from './src/screens/ContactDetail/ContactDetail'
import MyProfile from './src/screens/MyProfile/MyProfile'
import Privacity from './src/screens/Privacity/Privacity'
import SoundsNotifications from './src/screens/SoundsNotifications/SoundsNotifications'
import ContactsManager from './src/screens/ContactsManager/ContactsManager'
import About from './src/screens/About/About'

const Stack = createNativeStackNavigator()

const App = () => {

  const appState = useRef(AppState.currentState)
  const dispatch = useDispatch()
  const {theme, currentUser} = useSelector(state => state)

  useEffect(() => {
    (async() => {
      const themeStorage = await AsyncStorage.getItem('theme')
      if(themeStorage) {
        dispatch(getTheme(themeStorage))
      }
    })()
  }, [])

  useEffect(() => {
    if(currentUser) {
      const subscription = AppState.addEventListener('change', 
      (nextAppState ) => {
        if(appState.current.match(/inactive|background/) && nextAppState === 'active') {
          userOffline(currentUser.uid, true)
        } else {
          userOffline(currentUser.uid, false)
        }
        appState.current = nextAppState
      })
      return () => {
        subscription.remove()
      }
    }
  }, [currentUser])

  return (
    <NavigationContainer theme={theme === 'dark' ? Theme.dark : Theme.light}>
      <StatusBar backgroundColor={Theme[theme].colors.primary} barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}  />
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={Splash}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='Main'
          component={Main}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='Rooms'
          component={Rooms}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='Contacts'
          component={Contacts}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen 
          name="Contact" 
          component={ContactDetail}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='Chat'
          component={ChatScreen}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='Profile'
          component={MyProfile}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='Privacity'
          component={Privacity}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='SoundsNotifications'
          component={SoundsNotifications}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='ContactsManager'
          component={ContactsManager}
          options={{headerShown: false, animation:'none'}} />
        <Stack.Screen
          name='About'
          component={About}
          options={{headerShown: false, animation:'none'}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App