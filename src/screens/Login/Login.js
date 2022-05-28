import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../components/Loader/Loader'
import logo from '../../assets/logo.png'
import logoLight from '../../assets/logo_light.png'
import { login } from '../../redux/actions'
import { useSelector } from 'react-redux'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './Login.styles'
import RandomCode from './RandomCode'

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isCode, setIsCode] = useState(true)
  const styles = useStyles(getStyles)

  const theme = useSelector(state => state.theme)

  const handleLogin = async() => {
    setIsLoading(true)
    const res = await login()
    setIsLoading(false)
    if(res.status === 200) {
      navigation.pop()
      navigation.push('Main')
    } else {
      Alert.alert('Error', 'No se pudo iniciar sesión.\nIntente de nuevo.')
    }
  }

  return (
    <View style={styles.container}>
      {isCode && <RandomCode isCode={isCode} setIsCode={setIsCode} />}
      <View>
        <Image source={theme === 'dark' ? logo : logoLight} style={styles.logo} />
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Icon
          name='google' 
          color='white' 
          size={26}
          style={styles.icon} />
        <Text style={styles.textIcon}>
          Iniciar sesión con Google
        </Text>
      </TouchableOpacity>
      {isLoading && <Loader color={styles.loading.color} size={60} />}
    </View>
  )
}

export default Login