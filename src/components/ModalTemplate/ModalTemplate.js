import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './ModalTemplate.styles'

const ModalTemplate = ({
  modalVisible, 
  setModalVisible, 
  swipeDistance,
  titleIcon,
  title,
  children
}) => {

  const styles = useStyles(getStyles)

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.7}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}
      swipeThreshold={swipeDistance}
      animationInTiming={1}
      animationOutTiming={1}
      swipeDirection='down'
      style={styles.modelContentView} >
      <View style={styles.contentModal}>
        <View style={styles.upLine}></View>
        <View style={styles.titleBox}>
          <Icon name={titleIcon} color={styles.icon.color} size={16} style={styles.icon} />
          <Text style={styles.contentModalTitle}>{title}</Text>
        </View>
        {children}
      </View>
    </Modal>
  )
}

export default ModalTemplate