import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from './MyProfile.styles'
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate'
import ModalTouchableCustom from '../../components/ModalTouchableCustom/ModalTouchableCustom'
import Loader from '../../components/Loader/Loader'
import { changeName, changeStatus } from '../../redux/actions'

const MyProfile = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalChangeName, setModalChangeName] = useState(false)
  const [modalChangeStatus, setModalChangeStatus] = useState(false)
  const [modalChangePhoto, setModalChangePhoto] = useState(false)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [photo, setPhoto] = useState('')
  const [isError, setIsError] = useState({error: false, message: ''})

  const styles = useStyles()
  const {currentUser} = useSelector(state => state)

  useEffect(() => {
    setName(currentUser.displayName)
    setStatus(currentUser.status)
  }, [currentUser])

  const openModal = (action) => {
    setIsError({error: false, message: ''})
    if(action === 'estado') {
      setModalChangeStatus(true)
    } else if(action === 'nombre') {
      setModalChangeName(true)
    } else {
      setModalChangePhoto(true)
    }
  }

  const handleChangeStatus = (text) => {
    setStatus(text)
  }

  const handleChangeName = (text) => {
    setName(text)
  }

  const handleConfirmStatus = async() => {
    if(status.length === 0) {
      setIsError({error: true, message: 'El estado no puede estar vacío'})
    } else {
      setIsError({error: false, message: ''})
      setModalChangeStatus(false)
      setIsLoading(true)
      await changeStatus(currentUser.uid, status)
      setIsLoading(false)
    }
  }

  const handleConfirmName = async() => {
    if(name.length === 0) {
      setIsError({error: true, message: 'El nombre no puede estar vacío'})
    } else {
      setIsError({error: false, message: ''})
      setModalChangeName(false)
      setIsLoading(true)
      await changeName(currentUser.uid, name)
      setIsLoading(false)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack(null)}>
          <Icon name='arrow-back' size={30} color={styles.headerTitle.color} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.statusContainer}>
          <Text style={styles.email}>Estado para mostrar</Text>
          <TouchableOpacity style={styles.nameContainer} onPress={() => openModal('estado')}>
            <Text style={styles.name}>{currentUser.status}</Text>
            <IconFAw name='pen' size={14} color={styles.name.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri: currentUser.photoURL}} style={styles.photoURL} />
          <TouchableOpacity style={styles.cameraContainer} onPress={() => openModal('foto')}>
            <IconFAw name='camera' size={18} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nameContainer} onPress={() => openModal('nombre')}>
          <Text style={styles.name}>
            {currentUser.displayName.slice(0,30)}{currentUser.displayName.length > 30 ? '...' : ''}
          </Text>
          <IconFAw name='pen' size={14} color={styles.name.color} />
        </TouchableOpacity>
        <Text style={styles.email} selectable>{currentUser.email}</Text>
      </View>
      {/* MODAL PARA CAMBIAR ESTADO */}
      <ModalTemplate
        modalVisible={modalChangeStatus}
        setModalVisible={setModalChangeStatus}
        swipeDistance={180}
        titleIcon='pencil'
        title='Actualizar estado para mostrar' >
        <TextInput
          defaultValue={status}
          placeholder={isError.error ? isError.message : 'Nuevo estado para mostrar'} 
          placeholderTextColor={styles.placeholder.color}
          onChangeText={handleChangeStatus}
          style={styles.input} />
        <ModalTouchableCustom handleFunction={handleConfirmStatus} buttonName='Actualizar' type='text' />
      </ModalTemplate>
      {/* MODAL PARA CAMBIAR NOMBRE */}
      <ModalTemplate
        modalVisible={modalChangeName}
        setModalVisible={setModalChangeName}
        swipeDistance={180}
        titleIcon='pencil'
        title='Actualizar mi nombre' >
        <TextInput
          defaultValue={name}
          placeholder={isError.error ? isError.message : 'Nuevo nombre'} 
          placeholderTextColor={styles.placeholder.color}
          onChangeText={handleChangeName}
          style={styles.input} />
        <ModalTouchableCustom handleFunction={handleConfirmName} buttonName='Actualizar' type='text' />
      </ModalTemplate>
      {/* MODAL PARA FOTO */}
      <ModalTemplate
        modalVisible={modalChangePhoto}
        setModalVisible={setModalChangePhoto}
        swipeDistance={180}
        titleIcon='person'
        title='Cambiar foto de perfil' >
        <View style={styles.photoButtonsContainer}>
          <View>
            <TouchableOpacity style={styles.itemPhoto}>
              <Icon name='image' size={32} color={styles.itemPhoto.color} />
            </TouchableOpacity>
            <Text style={styles.itemText}>Galería</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.itemPhoto}>
              <Icon name='camera' size={32} color={styles.itemPhoto.color} />
            </TouchableOpacity>
            <Text style={styles.itemText}>Tomar foto</Text>
          </View>
        </View>
      </ModalTemplate>
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </View>
  )
}

export default MyProfile