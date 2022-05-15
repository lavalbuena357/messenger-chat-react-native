import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Theme, { color } from './src/colors/colors'
import Splash from './src/screens/Splash/Splash'
import Login from './src/screens/Login/Login'
import Main from './src/screens/Main/Main'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer theme={Theme}>
      <StatusBar backgroundColor={color.primary} />
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
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App