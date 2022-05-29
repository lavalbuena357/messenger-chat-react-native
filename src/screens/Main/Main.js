import { View } from 'react-native'
import React, { useEffect } from 'react'
import TabBar from '../../components/TabBar/TabBar'
import Rooms from '../Rooms/Rooms'
import Contacts from '../Contacts/Contacts'
import { useDispatch, useSelector } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Header from '../../components/Header/Header'
import { contactsList } from '../../redux/actions/contacs'
import { chatsList } from '../../redux/actions/chats'
import { getCurrentUser } from '../../redux/actions/users'

const Tab = createMaterialTopTabNavigator()

const Main = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.userReducer.currentUser)

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
    <View style={{flex: 1}}>
      <Header />
      <Tab.Navigator
        tabBarPosition='bottom'
        initialRouteName='Rooms'
        screenOptions={{
           headerShown:true
        }}
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
    </View>
  )
}

export default Main