import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useStyles from '../ModalTemplate/ModalTemplate.styles'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ModalTouchableCustom = ({handleFunction, buttonName, type, iconName}) => {
  const styles = useStyles()

  return (
    <>
      {type === 'text' ? 
      <TouchableOpacity onPress={handleFunction} style={type === 'text' ? styles.textButton: styles.iconButton}>
        <Text style={styles.textButtonText}>{buttonName}</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity onPress={handleFunction} style={type === 'text' ? styles.textButton: styles.iconButton}>
        <Icon name={iconName} color={styles.iconButtonText.color} size={24} />
        <Text style={styles.iconButtonText}>{buttonName}</Text>
      </TouchableOpacity>
      }
    </>
  )
}

export default ModalTouchableCustom