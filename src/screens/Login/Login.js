import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../components/Loader/Loader'
import logo from '../../assets/logo.png'
import useStyles from './Login.styles'

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const styles = useStyles()

  const handleLogin = async() => {
    navigation.pop()
    navigation.push('Main')
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