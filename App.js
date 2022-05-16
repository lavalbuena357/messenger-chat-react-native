import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
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
import { getTheme } from './src/redux/actions'

const Stack = createNativeStackNavigator()

const App = () => {

  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)

  useEffect(() => {
    (async() => {
      const themeStorage = await AsyncStorage.getItem('theme')
      if(themeStorage) {
        dispatch(getTheme(themeStorage))
      }
    })()
  }, [])

  return (
    <NavigationContainer theme={theme === 'dark' ? Theme.dark : Theme.light}>
      <StatusBar backgroundColor={Theme[theme].colors.primary} />
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={Splash}
          options={{headerShown: false}} />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{headerShown: false}} />
        <Stack.Screen
          name='Main'
          component={Main}
          options={{headerShown: false}} />
        <Stack.Screen
          name='Rooms'
          component={Rooms}
          options={{headerShown: false}} />
        <Stack.Screen
          name='Contacts'
          component={Contacts}
          options={{headerShown: false}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App