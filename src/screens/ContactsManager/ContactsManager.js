import { View, Text } from 'react-native'
import React from 'react'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './ContactsManager.styles'

const ContactsManager = () => {

  const styles = useStyles(getStyles)

  return (
    <View>
      <Text>ContactsManager</Text>
    </View>
  )
}

export default ContactsManager