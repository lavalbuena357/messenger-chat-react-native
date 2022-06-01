import { View, Text } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import EmojisList from './EmojisList'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import useStyles from './ChatCustomEmojiPicker.styles'
import { UIActivityIndicator } from 'react-native-indicators'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tab = createMaterialTopTabNavigator()
const storage_key = '@emoji-selector:HISTORY'

const EmojiNavigator = ({setMessageText}) => {
  // const [history, setHistory] = useState([])

  // const loadHistoryAsync = async() => {
  //   let result = await AsyncStorage.getItem(storage_key)
  //   if (result) {
  //     let history = JSON.parse(result)
  //     setHistory({history})
  //   }
  // }

  const styles = useStyles()

  const Smiles = useCallback(() => <EmojisList category={'Smileys & Emotion'} setMessageText={setMessageText} />, [])
  const People = useCallback(() => <EmojisList category={'People & Body'} setMessageText={setMessageText} />, [])
  const Animals = useCallback(() => <EmojisList category={'Animals & Nature'} setMessageText={setMessageText} />, [])
  const Food = useCallback(() => <EmojisList category={'Food & Drink'} setMessageText={setMessageText} />, [])
  const Travel = useCallback(() => <EmojisList category={'Travel & Places'} setMessageText={setMessageText} />, [])
  const Activities = useCallback(() => <EmojisList category={'Activities'} setMessageText={setMessageText} />, [])
  const Objects = useCallback(() => <EmojisList category={'Objects'} setMessageText={setMessageText} />, [])
  const Symbols = useCallback(() => <EmojisList category={'Symbols'} setMessageText={setMessageText} />, [])
  const Flags = useCallback(() => <EmojisList category={'Flags'} setMessageText={setMessageText} />, [])

  const LazyComponent = useCallback(() => <UIActivityIndicator color='#ff8400' size={38} />, [])


  return (
    <Tab.Navigator
      backBehavior='none'
      screenOptions={{
        tabBarStyle: styles.categories,
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {backgroundColor: '#ff8400'},
        lazy: true,
        lazyPreloadDistance: 1,
        lazyPlaceholder: () => LazyComponent()
      }} >
      <Tab.Screen
        name='Smiles'
        component={Smiles}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='smile' size={20} style={styles.categoryIcon} />
          )
        }} />
       <Tab.Screen
        name='People'
        component={People}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='user-friends' size={20} style={styles.categoryIcon} />
          )
        }} />
      <Tab.Screen
        name='Animals'
        component={Animals}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='paw' size={20} style={styles.categoryIcon} />
          )
        }} />
      <Tab.Screen
        name='Food'
        component={Food}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='apple-alt' size={20} style={styles.categoryIcon} />
          )
        }} />
      <Tab.Screen
        name='Travel'
        component={Travel}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='city' size={20} style={styles.categoryIcon} />
          )
        }} />
      <Tab.Screen
        name='Activities'
        component={Activities}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='futbol' size={20} style={styles.categoryIcon} />
          )
        }} />
      <Tab.Screen
        name='Objects'
        component={Objects}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='glasses' size={20} style={styles.categoryIcon} />
          )
        }} />
       <Tab.Screen
        name='Symbols'
        component={Symbols}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='mercury' size={20} style={styles.categoryIcon} />
          )
        }} />
      <Tab.Screen
        name='Flags'
        component={Flags}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <IconFAw name='flag' size={20} style={styles.categoryIcon} /> 
          )
        }} />
    </Tab.Navigator>
  )
}

export default memo(EmojiNavigator)