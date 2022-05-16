import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import useStyles from './Header.styles'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'

import photoURL from '../../assets/avatar.png'

const Header = () => {
  const styles = useStyles()

  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleSettings = () => {

  }

  const handleTheme = () => {
    if(theme === 'dark') {
      dispatch(getTheme('light'))
      AsyncStorage.setItem('theme', 'light')
    } else {
      dispatch(getTheme('dark'))
      AsyncStorage.setItem('theme', 'dark')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={photoURL} style={styles.photoURL} />
        <Text style={styles.title}>Let's Conn</Text>
      </View>
      <View style={styles.rightCn}>
        <TouchableOpacity onPress={handleTheme} style={{padding:5, marginRight:15}}>
          <Icon name={theme === 'dark' ? 'sunny' : 'cloudy-night-outline'} size={24} color={styles.icons.color}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}>
          <MatIcon name='dots-vertical' size={24} color={styles.icons.color} style={{padding:5}}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header