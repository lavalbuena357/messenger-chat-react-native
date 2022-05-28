import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { randomCode } from '../../utils/viefifyRandomCode'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RandomCode = ({isCode, setIsCode}) => {
  const [newCode, setNewCode] = useState(() => randomCode(4))
  const [isText, setIsText] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const onKeyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  }

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    (async() => {
      if(keyboardHeight > 0) {
        await AsyncStorage.setItem('height', keyboardHeight.toString())
      }
    })()
  }, [keyboardHeight])

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const handleConfirm = async() => {
    if(isText === newCode.split(' ').join('').toString()) {
      setIsCode(false)
      setNewCode('')
    } else {
      Alert.alert('Código incorrecto', 'Intente nuevamente o pruebe otro código')
    }
  }

  const handleChange = (text) => {
    setIsText(text)
  }

  return (
    <Modal
      isVisible={isCode}
      backdropOpacity={0.8} >
      <View style={styles.container}>
        <Text>Ingrese el código para continuar</Text>
        <TextInput
          maxLength={4}
          onChangeText={handleChange}
          style={styles.input}
          placeholderTextColor='#242424' />
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={{color: 'white', fontSize: 16}}>ENVIAR</Text>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{newCode}</Text>
            <TouchableOpacity style={styles.renew} onPress={() => setNewCode(() =>randomCode(4))}>
              <Icon name='autorenew' size={40} color='#37294d' />
            </TouchableOpacity>
          </View>
      </View>
    </Modal>
  )
}

export default RandomCode

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#D5D5D8',
    width: '50%',
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingHorizontal: 5,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#37294d',
    fontWeight: 'bold'
  },
  button: {
    marginBottom: 15,
    backgroundColor: '#1a1428',
    padding: 10,
    borderRadius: 5,
    borderColor: 'white', 
    borderWidth: 1
  },
  textContainer: {
    backgroundColor: '#ededed',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#37294d',
  },
  renew: {
    borderColor: '#37294d',
    borderWidth: 0.5,
    borderRadius: 5,
    marginLeft: 10
  }
})