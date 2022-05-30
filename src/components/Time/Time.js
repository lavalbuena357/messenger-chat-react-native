import { Text } from 'react-native'
import React from 'react'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from '../ChatItem/ChatItem.styles'

const Time = ({date, verboseDate, tooltip, children, ...rest}) => {

  const styles = useStyles(getStyles)

  return (
     <Text style={styles.date}>{children}</Text>
  )
}

export default Time