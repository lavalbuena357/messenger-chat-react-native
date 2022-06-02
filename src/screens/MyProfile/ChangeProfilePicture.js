import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './MyProfile.styles'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'
import { requestStoragePermission } from '../../utils/Permissions'
import ModalCropImage from './ModalCropImage'

const ChangeProfilePicture = ({modalChangePhoto, setModalChangePhoto}) => {
  const [photo, setPhoto] = useState(null)
  const [isModalImage, setIsModalImage] = useState(false)

  const styles = useStyles(getStyles)

  const handleChangePicture = async(type) => {
    setPhoto(null)
    if(type === 'photo') {
      const resStorage = await requestStoragePermission()
      if(resStorage) {
        try {
          const itemSelected = await ImagePicker.openPicker({
            cropping: true, 
            mediaType: 'photo',
            includeBase64: true,
            width: 512,
            height: 512,
            compressImageMaxWidth: 512,
            compressImageMaxHeight: 512,
            cropperStatusBarColor: styles.statusBarCrop.color,
            cropperToolbarColor: styles.statusBarCrop.color,
            cropperActiveWidgetColor: styles.ButtonPreview.backgroundColor,
            cropperToolbarWidgetColor: styles.bottomCrop.color,
            cropperCircleOverlay: true,
          })
          const fileExtension = itemSelected.path.split('/').pop().split('.')[1]
          setPhoto({uri: itemSelected.path, data: itemSelected.data, width: itemSelected.width, height: itemSelected.height, fileExtension: fileExtension})
          setIsModalImage(true)
          await ImagePicker.clean()
        } catch (error) {console.log(error)}
      } else {
        Alert.alert('Se requieren permisos', 'No concedieron los permisos para acceder al almacenamiento interno.')
      }
    } else {
      const resStorage = await requestStoragePermission()
      if(resStorage) {
        try {
          const itemSelected = await ImagePicker.openCamera({
            cropping: true, 
            mediaType: 'photo',
            includeBase64: true,
            width: 512,
            height: 512,
            useFrontCamera: true,
            compressImageMaxWidth: 512,
            compressImageMaxHeight: 512,
            cropperStatusBarColor: styles.statusBarCrop.color,
            cropperToolbarColor: styles.statusBarCrop.color,
            cropperActiveWidgetColor: styles.ButtonPreview.backgroundColor,
            cropperToolbarWidgetColor: styles.bottomCrop.color,
            cropperCircleOverlay: true,
          })
          const fileExtension = itemSelected.path.split('/').pop().split('.')[1]
          setPhoto({uri: itemSelected.path, data: itemSelected.data, width: itemSelected.width, height: itemSelected.height, fileExtension: fileExtension})
          setIsModalImage(true)
          await ImagePicker.clean()
        } catch (error) {console.log(error)}
      } else {
        Alert.alert('Se requieren permisos', 'No concedieron los permisos para acceder al almacenamiento interno.')
      }
    }
  }

  return (
    <ModalTemplate
        modalVisible={modalChangePhoto}
        setModalVisible={setModalChangePhoto}
        swipeDistance={180}
        titleIcon='person'
        title='Cambiar foto de perfil' >
        <View style={styles.photoButtonsContainer}>
          <View>
            <TouchableOpacity style={styles.itemPhoto} onPress={() => handleChangePicture('photo')}>
              <Icon name='image' size={32} color={styles.itemPhoto.color} />
            </TouchableOpacity>
            <Text style={styles.itemText}>Galería</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.itemPhoto} onPress={() => handleChangePicture('camera')}>
              <Icon name='camera' size={32} color={styles.itemPhoto.color} />
            </TouchableOpacity>
            <Text style={styles.itemText}>Tomar foto</Text>
          </View>
        </View>
        {isModalImage &&
        <ModalCropImage 
        photo={photo} 
        setPhoto={setPhoto}
        isModalImage={isModalImage}
        setIsModalImage={setIsModalImage}
        setModalChangePhoto={setModalChangePhoto} />
        }
      </ModalTemplate>
  )
}

export default ChangeProfilePicture