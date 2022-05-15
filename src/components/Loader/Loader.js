import { View } from 'react-native'
import React from 'react'
import { 
  SkypeIndicator,
  UIActivityIndicator,
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  WaveIndicator
 } from 'react-native-indicators'
import styles from './Loader.styles'
// BallIndicator
// BarIndicator
// DotIndicator
// MaterialIndicator
// PacmanIndicator
// PulseIndicator
// SkypeIndicator
// UIActivityIndicator
// WaveIndicator

const Loader = ({color, size, type}) => {
  return (
    <View style={styles.container}>
      {type === 'netError' ? 
      <WaveIndicator color={color} size={size} />
      :
      <SkypeIndicator color={color} size={size} />
      }
    </View>
  )
}

export default Loader