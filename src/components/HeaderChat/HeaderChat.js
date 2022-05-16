import { View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import useStyles from './HeaderChat.styles'
import { useNavigation } from '@react-navigation/native'

import photoURL from '../../assets/avatar.png'

const HeaderChat = () => {

  const styles = useStyles()
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const handleSettings = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name='arrow-back-outline' size={30} color={styles.icons.color} />
        </TouchableOpacity>
        <Image source={photoURL} style={styles.photoURL} />
        <View>
          <Text style={styles.name}>Nombre de contacto</Text>
          <Text style={styles.online}>En línea</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleSettings}>
        <MatIcon name='dots-vertical' size={24} color={styles.icons.color} style={{padding:5}}/>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderChat