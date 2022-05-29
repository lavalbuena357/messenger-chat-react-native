import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import FAwIcon from 'react-native-vector-icons/FontAwesome'
import { getStyles } from './ChatModalImage.styles'
import useStyles from '../../../Hooks/UseStyles'
import { requestStoragePermission } from '../../../utils/Permissions'
import { launchImageLibrary } from 'react-native-image-picker'
import ModalPreview from './ModalPreview'

const ChatModalImage = ({isModalImage, setIsModalImage}) => {
  const [mediaData, setMediaData] = useState([])
  const [isModalPreview, setIsModalPreview] = useState(false)

  const styles = useStyles(getStyles)

  const handleUpload = async(type) => {
    const resStorage = await requestStoragePermission()
    if(type === 'photo') {
      setMediaData([])
      if(resStorage) {
        const itemSelect = await launchImageLibrary({mediaType: type, maxWidth: 1024, maxHeight: 1024, includeBase64:true})
        if(itemSelect.assets) {
          setMediaData([[itemSelect.assets[0]], type])
          setIsModalPreview(true)
          setIsModalImage(false)
        }
      } else {
        Alert.alert('Se requieren permisos', 'No concedieron los permisos para acceder al almacenamiento interno.')
      }
    }
  }

  return (
    <View>
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
          <TouchableOpacity style={styles.iconContainer} onPress={() => handleUpload('video')}>
            <FAwIcon name='file-video-o' size={25} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <FAwIcon name='camera' size={25} style={styles.icon} />
          </TouchableOpacity>
          <TextInput autoFocus={true} style={{display: 'none'}} />
        </View>
        <View style={styles.before}></View>
      </Modal>
      <ModalPreview 
        isModalPreview={isModalPreview} 
        setIsModalPreview={setIsModalPreview}
        mediaData={mediaData} />
    </View>
  )
}

export default ChatModalImage