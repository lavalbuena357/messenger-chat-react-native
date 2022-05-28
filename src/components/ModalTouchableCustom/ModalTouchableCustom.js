import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from '../ModalTemplate/ModalTemplate.styles'

const ModalTouchableCustom = ({handleFunction, buttonName, type, iconName}) => {

  const styles = useStyles(getStyles)

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