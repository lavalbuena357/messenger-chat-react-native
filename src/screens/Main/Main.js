import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from '../../components/TabBar/TabBar'
import Rooms from '../Rooms/Rooms'
import Contacts from '../Contacts/Contacts'
import { useDispatch, useSelector } from 'react-redux'
import { chatsList, contactsList, getCurrentUser } from '../../redux/actions'

const Tab = createBottomTabNavigator()

const Main = () => {

  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  useEffect(() => {
    if(currentUser !== null) {
      dispatch(contactsList(currentUser.uid))
      dispatch(chatsList(currentUser.uid))
    }
  }, [currentUser])

  return (
    <Tab.Navigator
      initialRouteName='Rooms'
      tabBar={props => <TabBar {...props} />} >
      <Tab.Screen
        name='Rooms'
        component={Rooms}
        options={{
          headerShown: false,
          tabBarIcon: 'chatbubble',
          tabBarLabel:'Chats',
          tabBarBadge: 2,
        }} />
      <Tab.Screen
        name='Contactos'
        component={Contacts}
        options={{
          headerShown: false,
          tabBarIcon: 'md-people',
          tabBarLabel:'Contactos',
          tabBarBadge: 0,
        }} />
    </Tab.Navigator>
  )
}

export default Main