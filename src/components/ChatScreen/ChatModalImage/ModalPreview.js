import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './ChatModalImage.styles'
import { useSelector } from 'react-redux'
import { saveMedia } from '../../../redux/actions/chats'

const ModalPreview = ({setIsModalPreview, isModalPreview, mediaData, contact}) => {

  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)

  const resize = (d) => {
    const aspectRatio = d.height > d.width ? '0.5' : d.width > d.height ? '1.5' : '1'
    const width = d.width > d.height ? `${screenWidth*0.95}` : d.width === d.height ? `${screenWidth*0.95}` : 'null'
    const height = d.height > d.width ? `${screenHeight*0.8}` : 'null'
    return {aspectRatio, width, height}
  }

  const uploadFile = async() => {
    const file = mediaData[0][0].base64
    const metadata = resize({width: mediaData[0][0].width, height: mediaData[0][0].height})
    const cate = mediaData[1]
    const timestamp = Date.now()
    const fileExtension = mediaData[0][0].fileName.split('.')[1]
    const filename = `${cate}_${currentUser.uid}-${timestamp}.${fileExtension}`
    saveMedia(file, metadata, filename, cate, currentUser.uid, contact.uid)
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
              width: el.width > el.height ? screenWidth*0.95: el.width === el.height ? screenWidth*0.95 : null, 
              height: el.height > el.width ? screenHeight*0.8 : null}} />
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