import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useStyles from '../ModalTemplate/ModalTemplate.styles'

const ModalTouchableCustom = ({handleFunction, buttonName, type}) => {
  const styles = useStyles()

  return (
    <TouchableOpacity onPress={handleFunction} style={styles.textButton}>
      {type === 'text' && <Text style={styles.textButtonText}>{buttonName}</Text>}
    </TouchableOpacity>
  )
}

export default ModalTouchableCustom