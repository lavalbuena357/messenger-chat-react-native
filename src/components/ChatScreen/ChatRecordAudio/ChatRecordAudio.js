import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './ChatRecordAudio.styles'
import { DotIndicator } from 'react-native-indicators'
import { readFile } from 'react-native-fs'
import { useSelector } from 'react-redux'
import { saveMedia } from '../../../redux/actions/chats'

const audioRecorderPlayer = new AudioRecorderPlayer()
audioRecorderPlayer.setSubscriptionDuration(0.1)

const ChatRecordAudio = ({setMicSelected, contact}) => {
  const [recordState, setRecordState] = useState(false)
  const [audioRecorder, setAudioRecorder] = useState({
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
  })

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)

  useEffect(() => {
    onStartRecord()
  }, [])

  const onStartRecord = async() => {
    await audioRecorderPlayer.startRecorder()
    audioRecorderPlayer.addRecordBackListener((e) => {
      setAudioRecorder({
        ...audioRecorder,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      })
      return
    })
  }

  const onStopRecord = async() => {
    const uri = await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    setAudioRecorder({
      ...audioRecorder,
      recordSecs: 0,
    })
    const file = await readFile(uri, 'base64')
    const metadata = {type: 'audio/mp3'}
    const cate = 'audio'
    const timestamp = Date.now()
    const filename = `${cate}_${currentUser.uid}-${timestamp}.mp3`
    await saveMedia(file, metadata, filename, cate, currentUser.uid, contact.uid)
    setMicSelected(false)
  }

  const onCancelRecord = async() => {
    setRecordState(false)
    await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    setAudioRecorder({
      ...audioRecorder, 
      recordSecs: 0, 
      recordTime: '00:00:00',
    })
    setMicSelected(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity
          onPress={onCancelRecord}
          style={styles.icon} >
          <Icon name='trash' size={28} color={styles.icon.color} />
        </TouchableOpacity>
        <Text style={styles.icon}>{audioRecorder.recordTime}</Text>
      </View>
      <View style={styles.right}>
        <DotIndicator size={8} style={{position: 'absolute', right: 50}} color={styles.inidicator.color} />
        <TouchableOpacity
          onPress={onStopRecord}
          style={styles.icon} >
          <Icon name='send' size={24} color={styles.icon.color} />
        </TouchableOpacity>
      </View> 
  </View>
  )
}

export default ChatRecordAudio