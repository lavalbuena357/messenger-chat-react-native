import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from '../../components/TabBar/TabBar'
import Rooms from '../Rooms/Rooms'
import Contacts from '../Contacts/Contacts'

const Tab = createBottomTabNavigator()

const Main = () => {

  return (
    <Tab.Navigator
      initialRouteName='Rooms'
      tabBar={props => <TabBar {...props} />} >
      <Tab.Screen
        name='Rooms'
        component={Rooms}
        options={{
          headerShown: false,
          tabBarIcon: 'chatbubble-outline',
          tabBarLabel:'Rooms',
          tabBarBadge: 2,
        }} />
      <Tab.Screen
        name='Contactos'
        component={Contacts}
        options={{
          headerShown: false,
          tabBarIcon: 'md-people-outline',
          tabBarLabel:'Contactos',
          tabBarBadge: 0,
        }} />
    </Tab.Navigator>
  )
}

export default Main