import { View, Text } from 'react-native'
import React from 'react'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './SoundsNotifications.styles'

const SoundsNotifications = () => {

  const styles = useStyles(getStyles)

  return (
    <View>
      <Text>SoundsNotifications</Text>
    </View>
  )
}

export default SoundsNotifications