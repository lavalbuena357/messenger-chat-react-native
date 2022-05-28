import { View, Image, BackHandler } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logo from '../../assets/fullscreen_logo.png'
import logoLight from '../../assets/fullscreen_logo_light.png'
import { getStyles } from './Splash.styles'
import { useSelector } from 'react-redux'
import useStyles from '../../Hooks/UseStyles'

const Splash = ({navigation}) => {
  let count = 0

  const theme = useSelector(state => state.theme)

  const styles = useStyles(getStyles)

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
      <Image source={theme === 'dark' ? logo : logoLight} style={styles.logo} />
    </View>
  )
}

export default Splash