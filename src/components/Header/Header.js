import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getTheme } from '../../redux/actions'
import ModalSettings from '../ModalSettings/ModalSettings'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './Header.styles'

const Header = () => {
  const [showModalSettings, setShowModalSettings] = useState(false)

  const styles = useStyles(getStyles)

  const {theme, currentUser} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleSettings = () => {
    setShowModalSettings(true)
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
        <Image source={{uri:currentUser.photoURL}} style={styles.photoURL} />
        <Text style={styles.title}>Let'sConn</Text>
      </View>
      <View style={styles.rightCn}>
        <TouchableOpacity onPress={handleTheme} style={{padding:5, marginRight:15}}>
          <Icon name={theme === 'dark' ? 'sunny' : 'cloudy-night'} size={24} color={styles.icons.color}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}>
          <MatIcon name='dots-vertical' size={24} color={styles.icons.color} style={{padding:5}}/>
        </TouchableOpacity>
      </View>
      <ModalSettings showModalSettings={showModalSettings} setShowModalSettings={setShowModalSettings} />
    </View>
  )
}

export default Header