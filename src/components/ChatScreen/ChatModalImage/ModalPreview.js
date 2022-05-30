import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './ChatModalImage.styles'
import { useSelector } from 'react-redux'
import { saveMedia } from '../../../redux/actions/chats'

const ModalPreview = ({setIsModalPreview, isModalPreview, mediaData, contact, setIsModalImage}) => {
  const [isRezise, setIsRezise] = useState(null)

  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)

  useEffect(() => {
      resize()
  }, [])

  const resize = useCallback(() => {
    const mediaWidth = mediaData[0][0].width
    const mediaHeight = mediaData[0][0].height
    const ratio = Math.min((screenWidth*0.9)/mediaWidth, (screenHeight*0.9)/mediaHeight)
    setIsRezise({width: mediaWidth*ratio, height: mediaHeight*ratio})
  }, [])

  const uploadFile = async() => {
    const file = mediaData[0][0].base64
    const metadata = {width: `${isRezise.width}`, height: `${isRezise.height}`}
    const cate = mediaData[1]
    const timestamp = Date.now()
    const fileExtension = mediaData[0][0].fileName.split('.')[1]
    const filename = `${cate}_${currentUser.uid}-${timestamp}.${fileExtension}`
    saveMedia(file, metadata, filename, cate, currentUser.uid, contact.uid)
    setIsModalPreview(false)
    setIsModalImage(false)
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
            style={{borderRadius: 10, width: isRezise && isRezise.width, height: isRezise&&  isRezise.height}} />
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