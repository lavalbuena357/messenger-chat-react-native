import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from './MyProfile.styles'
import Header from '../../components/Header/Header'

const MyProfile = ({navigation}) => {
  const [modalChangeName, setModalChangeName] = useState(false)
  const [modalChangeStatus, setModalChangeStatus] = useState(false)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')

  const styles = useStyles()
  const {currentUser} = useSelector(state => state)

  useEffect(() => {
    setName()
  }, [currentUser])

  const goBack = () => {
    navigation.goBack(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Icon name='arrow-back' size={30} color={styles.headerTitle.color} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.statusContainer}>
          <Text style={styles.email}>Estado para mostrar:</Text>
          <TouchableOpacity style={styles.nameContainer}>
            <Text style={styles.name}>{currentUser.status}</Text>
            <IconFAw name='pen' size={14} color={styles.name.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri: currentUser.photoURL}} style={styles.photoURL} />
          <TouchableOpacity style={styles.cameraContainer}>
            <IconFAw name='camera' size={18} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nameContainer}>
          <Text style={styles.name}>
            {currentUser.displayName.slice(0,30)}{currentUser.displayName.length > 30 ? '...' : ''}
          </Text>
          <IconFAw name='pen' size={14} color={styles.name.color} />
        </TouchableOpacity>
        <Text style={styles.email} selectable>{currentUser.email}</Text>
        
      </View>
    </View>
  )
}

export default MyProfile