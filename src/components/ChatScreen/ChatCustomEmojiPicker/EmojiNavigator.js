import { View, Text } from 'react-native'
import React, { memo, useCallback } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import EmojisList from './EmojisList'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import useStyles from './ChatCustomEmojiPicker.styles'
import { UIActivityIndicator } from 'react-native-indicators'

const Tab = createMaterialTopTabNavigator()

const EmojiNavigator = ({setMessageText}) => {

  const styles = useStyles()

  const Smiles = useCallback(() => <EmojisList index={0} setMessageText={setMessageText} />, [])
  const People = useCallback(() => <EmojisList index={1} setMessageText={setMessageText} />, [])
  const Animals = useCallback(() => <EmojisList index={2} setMessageText={setMessageText} />, [])
  const Food = useCallback(() => <EmojisList index={3} setMessageText={setMessageText} />, [])
  const Travel = useCallback(() => <EmojisList index={4} setMessageText={setMessageText} />, [])
  const Activities = useCallback(() => <EmojisList index={5} setMessageText={setMessageText} />, [])
  const Objects = useCallback(() => <EmojisList index={6} setMessageText={setMessageText} />, [])
  const Symbols = useCallback(() => <EmojisList index={7} setMessageText={setMessageText} />, [])
  const Flags = useCallback(() => <EmojisList index={8} setMessageText={setMessageText} />, [])

  const LazyComponent = useCallback(() => <UIActivityIndicator color='#ff8400' size={38} />, [])


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.categories,
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {backgroundColor: '#ff8400'},
        lazy: true,
        lazyPreloadDistance: 3,
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