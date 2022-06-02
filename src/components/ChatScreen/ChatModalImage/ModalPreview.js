import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './ChatModalImage.styles'
import { useSelector } from 'react-redux'
import { saveMedia } from '../../../redux/actions/chats'
import Loader from '../../Loader/Loader'

const ModalPreview = ({setIsModalImage, mediaData, contact, isModalPreview, setIsModalPreview}) => {
  const [isRezise, setIsRezise] = useState(null)
  const [isLoading, setIsLoading] = useState(false) 

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()

  useEffect(() => {
    resize()
  }, [])

  const resize = useCallback(() => {
    const mediaWidth = mediaData.width
    const mediaHeight = mediaData.height
    const ratio = Math.min((screenWidth*0.9)/mediaWidth, (screenHeight*0.9)/mediaHeight)
    setIsRezise({width: mediaWidth*ratio, height: mediaHeight*ratio})
  }, [])

  const uploadFile = async() => {
    setIsLoading(true)
    const file = mediaData.data
    const metadata = {width: `${isRezise.width}`, height: `${isRezise.height}`}
    const cate = 'photo'
    const timestamp = Date.now()
    const fileExtension = mediaData.fileExtension
    const filename = `${cate}_${currentUser.uid}-${timestamp}.${fileExtension}`
    await saveMedia(file, metadata, filename, cate, currentUser.uid, contact.uid)
    setIsLoading(false)
    setIsModalImage(false)
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
        <View >
          <Image source={{uri: mediaData.uri}} style={{borderRadius: 10, width: isRezise && isRezise.width, height: isRezise&&  isRezise.height}} />
        </View>
        <View style={styles.boxButtons}>
          <TouchableOpacity style={styles.ButtonPreview} onPress={() => setIsModalImage(false)}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ButtonPreview} onPress={() => uploadFile()}>
            <Text>Enviar imagen</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </Modal>
  )
}

export default ModalPreview



  // const videoCopy = async() => {
  //   const destPath = `${RNFS.PicturesDirectoryPath}/test.mp4`
  //   await RNFS.copyFile(mediaData[0][0].uri, destPath)
  //   await RNFS.stat(destPath)
  //   console.log(`file://${destPath}`)
  //   setVideoUrl(`file://${destPath}`)
  // }

  // const videoDeleteCopy = async() => {
  //   try {
  //     const path = `${RNFS.PicturesDirectoryPath}/test.mp4`
  //     await RNFS.unlink(path)
  //     console.log('borrado')
  //   } catch (error) {console.warn(error)}
  // }

  // useEffect(() => {
  //   videoCopy()
  // }, [videoUrl])
  // console.log(videoUrl)


  // :
          // videoUrl !== null &&
          // <Video
          //   key={i+1}
          //   paused={true}
          //   style={{width: isRezise && isRezise.width, height: isRezise&&  isRezise.height}}
          //   controls={true}
          //   source={{uri: videoUrl}} />