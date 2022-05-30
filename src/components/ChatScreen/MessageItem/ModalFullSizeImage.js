import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './MessageItem.styles'

const ModalFullSizeImage = ({modalImageFull, setModalImageFull, message}) => {

  const styles = useStyles(getStyles)

  return (
    <Modal
      isVisible={modalImageFull}
      onBackButtonPress={() => setModalImageFull(false)}
      onBackdropPress={() => setModalImageFull(false)}
      onSwipeComplete={() => setModalImageFull(false)}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}
      animationInTiming={1}
      animationOutTiming={1}
      backdropOpacity={1}
      style={null} >
      <View style={styles.modalPreview}>
        <Image source={{uri: message.message}} style={{borderRadius: 10, width: parseFloat(message.metadata.width), height: parseFloat(message.metadata.height)}} />
        <TouchableOpacity style={styles.ButtonPreview} onPress={() => setModalImageFull(false)}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default ModalFullSizeImage