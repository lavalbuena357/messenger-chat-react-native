import { View, Text, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './MyProfile.styles'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'
import { changeProfilePic } from '../../redux/actions/users'
import Loader from '../../components/Loader/Loader'

const ModalCropImage = ({isModalImage, setIsModalImage, photo, setModalChangePhoto}) => {
  const [isRezise, setIsRezise] = useState(null)
  const [isLoading, setIsLoading] = useState(false) 

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const {width: screenWidth, height: screenHeight} = useWindowDimensions()

  useEffect(() => {
    resize()
  }, [])

  const resize = useCallback(() => {
    const photoWidth = photo.width
    const photoHeight = photo.height
    const ratio = Math.min((screenWidth*0.9)/photoWidth, (screenHeight*0.9)/photoHeight)
    setIsRezise({width: photoWidth*ratio, height: photoHeight*ratio})
  }, [])

  const uploadFile = async() => {
    setIsLoading(true)
    const file = photo.data
    const metadata = {width: `${isRezise.width}`, height: `${isRezise.height}`}
    const cate = 'photo'
    const timestamp = Date.now()
    const fileExtension = photo.fileExtension
    const filename = `profile_picture_${currentUser.uid}.${fileExtension}`
    await changeProfilePic(file, metadata, filename, currentUser.uid)
    setIsLoading(false)
    setIsModalImage(false)
    setModalChangePhoto(false)
  }

  return (
    <Modal
      isVisible={isModalImage}
      onBackButtonPress={() => setIsModalImage(false)}
      onBackdropPress={() => setIsModalImage(false)}
      onSwipeComplete={() => setIsModalImage(false)}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}
      animationInTiming={1}
      animationOutTiming={1}
      backdropOpacity={1}
      style={null} >
      <View style={styles.modalPreview}>
        <View >
          <Image source={{uri: photo.uri}} style={{borderRadius: 256, width: isRezise && isRezise.width, height: isRezise&&  isRezise.height}} />
        </View>
        <View style={styles.boxButtons}>
          <TouchableOpacity style={styles.ButtonPreview} onPress={() => setIsModalImage(false)}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ButtonPreview} onPress={() => uploadFile()}>
            <Text>Carmbiar foto de perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </Modal>
  )
}

export default ModalCropImage