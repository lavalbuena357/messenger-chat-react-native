import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './ChatModalImage.styles'
import { saveImage, saveMedia } from '../../../redux/actions'
import { useSelector } from 'react-redux'

const ModalPreview = ({setIsModalPreview, isModalPreview, mediaData, contact}) => {

  const { width, height } = useWindowDimensions()
  const styles = useStyles(getStyles)
  const {currentUser} = useSelector(state => state)

  const uploadFile = async() => {
    console.log(mediaData)
    const file = mediaData[0][0].base64
    const cate = mediaData[1]
    const timestamp = Date.now()
    const fileExtension = mediaData[0][0].fileName.split('.')[1]
    const filename = `${cate}_${currentUser.uid}-${timestamp}.${fileExtension}`
    saveMedia(file, filename, cate, currentUser.uid, contact.uid)
    setIsModalPreview(false)
  }

  return (
    <Modal
      isVisible={isModalPreview}
      onBackButtonPress={() => setIsModalPreview(false)}
      onBackdropPress={() => setIsModalPreview(false)}
      onSwipeComplete={() => setIsModalPreview(false)}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}
      animationInTiming={1}
      animationOutTiming={1}
      backdropOpacity={1}
      style={null} >
      <View style={styles.modalPreview}>
        {mediaData.length && mediaData[0].map((el, i) => (
          <Image 
            key={i} 
            source={{uri: el.uri}}  
            style={{
              borderRadius: 10, 
              aspectRatio: el.height > el.width ? 0.5 : el.width > el.height ? 1.5 : 1, 
              width: el.width > el.height ? width*0.95: el.width === el.height ? width*0.95 : null, 
              height: el.height > el.width ? height*0.8 : null}} />
        ))}
        <View style={styles.boxButtons}>
          <TouchableOpacity style={styles.ButtonPreview} onPress={() => setIsModalPreview(false)}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ButtonPreview} onPress={() => uploadFile()}>
            <Text>Enviar imagen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalPreview