import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../components/Loader/Loader'
import logo from '../../assets/logo.png'
import useStyles from './Login.styles'
import { login } from '../../redux/actions'

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const styles = useStyles()

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
      <View>
        <Image source={logo} style={styles.logo} />
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