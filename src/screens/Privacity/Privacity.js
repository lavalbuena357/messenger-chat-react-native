import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import useStyles from './Privacity.styles'

const Privacity = ({navigation}) => {
  const [showHiddenAll, setShowHiddenAll] = useState(false)
  const [showHiddenOnline, setShowHiddenOnline] = useState(false)
  const [showHiddenStatus, setShowHiddenStatus] = useState(false)
  const [showHiddenPhoto, setShowHiddenPhoto] = useState(false)
  const [showHiddeEmail, setShowHiddeEmail] = useState(false)

  const styles = useStyles()

  const handleAll = () => {
    if(showHiddenAll) {
      setShowHiddeEmail(false)
      setShowHiddenOnline(false)
      setShowHiddenPhoto(false)
      setShowHiddenStatus(false)
    } else {
      setShowHiddeEmail(true)
      setShowHiddenOnline(true)
      setShowHiddenPhoto(true)
      setShowHiddenStatus(true)
    }
    setShowHiddenAll(!showHiddenAll)
  }

  const handleOnline = () => {
    setShowHiddenOnline(!showHiddenOnline)
  }

  const handleStatus = () => {
    setShowHiddenStatus(!showHiddenStatus)
  }

  const handlePhoto = () => {
    setShowHiddenPhoto(!showHiddenPhoto)
  }

  const handleEmail = () => {
    setShowHiddeEmail(!showHiddeEmail)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack(null)}>
          <Icon name='arrow-back' size={30} color={styles.headerTitle.color} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacidad</Text>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.itemContainerAll}>
          <Text style={styles.itemTextAll}>Mostrar/Ocultar todo</Text>
          <TouchableOpacity onPress={handleAll}>
            <IconFAw name={showHiddenAll ? 'toggle-on' : 'toggle-off'} size={30} color={styles.itemText.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Mostrar en línea</Text>
          <TouchableOpacity onPress={handleOnline}>
            <IconFAw name={showHiddenOnline ? 'toggle-on' : 'toggle-off'} size={30} color={styles.itemText.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Estado para mostrar</Text>
          <TouchableOpacity onPress={handleStatus}>
            <IconFAw name={showHiddenStatus ? 'toggle-on' : 'toggle-off'} size={30} color={styles.itemText.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Mostrar foto de perfil</Text>
          <TouchableOpacity onPress={handlePhoto}>
            <IconFAw name={showHiddenPhoto ? 'toggle-on' : 'toggle-off'} size={30} color={styles.itemText.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Mostrar mi correo</Text>
          <TouchableOpacity onPress={handleEmail}>
            <IconFAw name={showHiddeEmail ? 'toggle-on' : 'toggle-off'} size={30} color={styles.itemText.color} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Privacity