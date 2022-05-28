import { View, Text } from 'react-native'
import React from 'react'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './About.styles'

const About = () => {

  const styles = useStyles(getStyles)

  return (
    <View>
      <Text>About</Text>
    </View>
  )
}

export default About