import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import FAwIcon from 'react-native-vector-icons/FontAwesome'
import { getStyles } from './ChatModalImage.styles'
import useStyles from '../../../Hooks/UseStyles'
import { requestCameraPermission, requestStoragePermission } from '../../../utils/Permissions'
import ModalPreview from './ModalPreview'
import ImagePicker from 'react-native-image-crop-picker'

const ChatModalImage = ({isModalImage, setIsModalImage, contact}) => {
  const [mediaData, setMediaData] = useState([])
  const [isModalPreview, setIsModalPreview] = useState(false)

  const styles = useStyles(getStyles)

  const handleUpload = async(type) => {
    setMediaData(null)
    if(type === 'photo') {
      const resStorage = await requestStoragePermission()
      if(resStorage) {
        try {
          const itemSelect = await ImagePicker.openPicker({
            cropping: true, 
            mediaType: 'photo',
            includeBase64: true,
            compressImageMaxWidth: 1024,
            compressImageMaxHeight: 1024,
            cropperStatusBarColor: styles.statusBarCrop.color,
            cropperToolbarColor: styles.statusBarCrop.color,
            cropperActiveWidgetColor: styles.ButtonPreview.backgroundColor,
            cropperToolbarWidgetColor: styles.bottomCrop.color,
          })
          const fileExtension = itemSelect.path.split('/').pop().split('.')[1]
          setMediaData({type: type, uri: itemSelect.path, data: itemSelect.data, width: itemSelect.width, height: itemSelect.height, fileExtension: fileExtension})
          setIsModalPreview(true)
          await ImagePicker.clean()
        } catch (error) {console.log(error)}
      } else {
        Alert.alert('Se requieren permisos', 'No concedieron los permisos para acceder al almacenamiento interno.')
      }
    } else {
      const resCamera = await requestCameraPermission()
      if(resCamera) {
        try {
          const itemSelect = await ImagePicker.openCamera({
            cropping: true, 
            mediaType: 'photo',
            includeBase64: true,
            useFrontCamera: true,
            compressImageMaxWidth: 1024,
            compressImageMaxHeight: 1024,
            cropperStatusBarColor: styles.statusBarCrop.color,
            cropperToolbarColor: styles.statusBarCrop.color,
            cropperActiveWidgetColor: styles.ButtonPreview.backgroundColor,
            cropperToolbarWidgetColor: styles.bottomCrop.color,
          })
          const fileExtension = itemSelect.path.split('/').pop().split('.')[1]
          setMediaData({type: 'photo', uri: itemSelect.path, data: itemSelect.data, width: itemSelect.width, height: itemSelect.height, fileExtension: fileExtension})
          setIsModalPreview(true)
          await ImagePicker.clean()
        } catch (error) {console.log(error)}
      } else {
        Alert.alert('Se requieren permisos', 'No concedieron los permisos para acceder a la cámara.')
      }
    }
  }
  
  return (
    <>
      <Modal
        isVisible={isModalImage}
        onBackButtonPress={() => setIsModalImage(false)}
        onBackdropPress={() => setIsModalImage(false)}
        onSwipeComplete={() => setIsModalImage(false)}
        animationOutTiming={1}
        backdropOpacity={0.5}
        backdropColor={styles.iconContainer.backgroundColor}
        swipeDirection='down'
        animationIn='bounceInRight'
        style={styles.modelContentView} >
        <View style={styles.contentModal}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => handleUpload('photo')}>
            <FAwIcon name='file-photo-o' size={25} style={styles.icon} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconContainer} onPress={() => Alert.alert('En desarrollo...', 'Pronto estará disponible esta funcion.\nPor ahora puede enviar fotos.')}>
            <FAwIcon name='file-video-o' size={25} style={styles.icon} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.iconContainer} onPress={() => handleUpload('camera')}>
            <FAwIcon name='camera' size={25} style={styles.icon} />
          </TouchableOpacity>
          <TextInput autoFocus={true} style={{display: 'none'}} />
        </View>
        <View style={styles.before}></View>
      </Modal>
      {isModalPreview && 
      <ModalPreview 
        mediaData={mediaData}
        isModalPreview={isModalPreview} 
        setIsModalPreview={setIsModalPreview}
        contact={contact}
        setIsModalImage={setIsModalImage} />}
    </>
  )
}

export default ChatModalImage