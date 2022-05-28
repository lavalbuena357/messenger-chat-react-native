import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { getStyles } from './ChatModalImage.styles'
import useStyles from '../../../Hooks/UseStyles'

const ChatModalImage = ({isModalImage, setIsModalImage}) => {

  const styles = useStyles(getStyles)

  return (
    <Modal
      isVisible={isModalImage}
      onBackButtonPress={() => setIsModalImage(false)}
      onBackdropPress={() => setIsModalImage(false)}
      onSwipeComplete={() => setIsModalImage(false)}
      animationOutTiming={1}
      backdropOpacity={0.5}
      swipeDirection='down'
      animationIn='bounceInRight'
      style={styles.modelContentView} >
      <View style={styles.contentModal}>
        <Text>Modal</Text>
      </View>
      <View style={styles.before}></View>
    </Modal>
  )
}

export default ChatModalImage