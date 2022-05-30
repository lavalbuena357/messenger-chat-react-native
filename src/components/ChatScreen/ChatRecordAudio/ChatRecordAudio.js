import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import Icon from 'react-native-vector-icons/Ionicons'
import { requestAudioPermission } from '../../../utils/Permissions'

const audioRecorderPlayer = new AudioRecorderPlayer()
audioRecorderPlayer.setSubscriptionDuration(0.1)

const ChatRecordAudio = ({setMicSelected}) => {
  const [recordState, setRecordState] = useState(false)
  const [playState, setPlayState] = useState('')
  const [audioRecorder, setAudioRecorder] = useState({
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  })

  useEffect(() => {
    (async () => {
      await handlePermissions()
    })()
  }, [])

  const handlePermissions = async() => {
    const resRecord = requestAudioPermission()
    if(!resRecord) {
      console.log(resRecord)
      Alert.alert('Se requieren permisos', 'No se concedieron los permisos para utilizar el micrófono.')
    }
  }

  const onStartRecord = async() => {
    setPlayState('')
    // setAudioRecorder({
    //   ...audioRecorder,
    //   recordTime: '00:00:00',
    //   // duration: '00:00:00',
    //   playTime: '00:00:00'
    // })
    setRecordState(true)
    await audioRecorderPlayer.startRecorder()
    audioRecorderPlayer.addRecordBackListener((e) => {
      setAudioRecorder({
        ...audioRecorder,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
      })
      return
    })
  }

  const onStopRecord = async() => {
    setRecordState(false)
    await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    // setAudioPlayerState(true)
    setAudioRecorder({
      ...audioRecorder,
      recordSecs: 0,
    })
  }

  const onCancelRecord = async() => {
    setRecordState(false)
    await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    // setAudioPlayerState(false)
    setAudioRecorder({
      ...audioRecorder, 
      recordSecs: 0, 
      recordTime: '00:00:00',
      duration: '00:00:00',
      playTime: '00:00:00'
    })
  }

  const onStartPlay = async() => {
    setPlayState('play')
    await audioRecorderPlayer.startPlayer()
    audioRecorderPlayer.addPlayBackListener((e) => {
      setAudioRecorder({
        ...audioRecorder,
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration))
      })
      return
    })
  }

  const onPausePlay = async() => {
    setPlayState('pause')
    await audioRecorderPlayer.pausePlayer()
  }

  const onStopPlay = async(e) => {
    setPlayState('stop')
    audioRecorderPlayer.stopPlayer()
    audioRecorderPlayer.removePlayBackListener()
    setAudioRecorder({
      ...audioRecorder,
      currentPositionSec: 0,
      currentDurationSec: e.duration,
      playTime: '00:00:00',
    })
  } 

  return (
    <View style={{ position: 'absolute', backgroundColor: 'red', bottom: 80, right: 10 }}>
      <Text>{audioRecorder.recordTime}</Text>
      <TouchableOpacity
        onPress={!recordState ? onStartRecord :  onStopRecord} 
        delayLongPress={600}
        style={{margin: 5, padding: 10}}>
        <Icon name={recordState ? 'mic' : 'mic-outline'} size={30} />
      </TouchableOpacity>
      {recordState && 
      <TouchableOpacity
        onPress={onCancelRecord}
        style={{margin: 5, padding: 10}}>
        <Icon name='trash-outline' size={30} />
      </TouchableOpacity>
      }
      {/* {audioPlayerState &&  */}
      <View style={{margin: 10}}>
        <Text>{audioRecorder.playTime} / {audioRecorder.duration}</Text>
        <TouchableOpacity
          onPress={onStartPlay}
          style={{margin: 5, padding: 10}}>
          <Icon name={playState === 'play' ? 'play' : 'play-outline'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPausePlay}
          style={{margin: 5, padding: 10}}>
          <Icon name={playState === 'pause' ? 'pause' : 'pause-outline'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onStopPlay}
          style={{margin: 5, padding: 10}}>
          <Icon name={playState === 'stop' ? 'stop' : 'stop-outline'} size={30} />
        </TouchableOpacity>
      </View>
    {/* } */}
  </View>
  )
}

export default ChatRecordAudio