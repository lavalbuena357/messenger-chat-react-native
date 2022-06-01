import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native'
import React, { useRef, useState } from 'react'
import useStyles from '../../../Hooks/UseStyles'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import {BallIndicator} from 'react-native-indicators'
import Slider from "@react-native-community/slider"

const AudioPlayer = ({message}) => {
  const [currentAudio, setCurrentAudio] = useState('')
  const [paused, setPaused] = useState(true)
  const [totalLength, setTotalLength] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [loading, setLoading] = useState(false)

  const styles = useStyles(getStyles)
  const audioRef = useRef(null)

  const onLoad = () => {
    setLoading(true)
  }

  const fixDuration = (data) => {
    setLoading(false);
    setTotalLength(data.duration)
  }

  const setTime = (data) => {
    setCurrentPosition(data.currentTime)
  }

  const togglePlay = () => {
    setPaused(!paused);
  }

  const onSeek = (time) => {
    time = Math.round(time);
    audioRef && audioRef.current.seek(time)
    setCurrentPosition(time)
    setPaused(false)
  }
  
  const resetAudio = () => {
    audioRef && audioRef.current.seek(0)
    setCurrentPosition(0)
    setPaused(true)
  }
  
  return (
    <View style={styles.container}>
      <Video
        source={{uri: message.message}}
        ref={audioRef}
        playInBackground={false}
        audioOnly={true}
        playWhenInactive={false}
        paused={paused}
        style={{height: 0, width: 0}}
        onEnd={resetAudio}
        onLoad={fixDuration}
        // onLoadStart={onLoad}
        onProgress={setTime} />
      <View>
        <View>
          {loading && <BallIndicator color='red' size={10} />
          || 
          <View>
            <TouchableOpacity onPress={togglePlay}>
              <Icon name={paused ? 'play' : 'pause'} size={24} color={styles.icon.color} />
            </TouchableOpacity>
          </View>
           }
        </View>
      </View>
      <Slider
        value={currentPosition}
        minimumValue={0}
        maximumValue={Math.max(totalLength, 1, currentPosition)}
        minimumTrackTintColor={styles.sliderPoint.color}
        maximumTrackTintColor={styles.slider.color}
        thumbTintColor={styles.sliderPoint.color}
        onSlidingComplete={onSeek}
        style={styles.slider} />
      <Text style={styles.icon}>{message.metadata.duration}</Text>
    </View>
  )
}

export default AudioPlayer

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', 
    height: 50,
    margin: 5,
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  icon: {
    color: colors.primary
  },
  slider: {
    height: 30,
    width: 100,
    color: '#a3a3a3'
  },
  sliderPoint: {
    color: colors.orange
  }
})