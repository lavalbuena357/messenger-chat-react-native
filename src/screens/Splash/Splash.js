import { View, Image, BackHandler } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logo from '../../assets/fullscreen_logo.png'
import useStyles from './Splash.styles'

const Splash = ({navigation}) => {
  let count = 0

  const styles = useStyles()

  useFocusEffect(
    useCallback(() => {
      if(navigation.getState().routes.length === 1) {
        count = count +1
      }
      if(count > 1) {
        BackHandler.exitApp()
      }
    }, [])
  )

  useEffect(() => {
    (async() => {
      const token = await AsyncStorage.getItem('googleToken')
      if(token) {
        navigation.push('Main')
        SplashScreen.hide()
      }
      else {
        navigation.push('Login')
        SplashScreen.hide()
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  )
}

export default Splash