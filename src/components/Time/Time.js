import { Text } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import useStyles from '../ChatItem/ChatItem.styles'

const Time = ({date, verboseDate, tooltip, children, ...rest}) => {
  const styles = useStyles()
  return (
     <Text style={styles.date}>{children}</Text>
  )
}
Time.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  verboseDate: PropTypes.string,
  tooltip: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
}

export default Time