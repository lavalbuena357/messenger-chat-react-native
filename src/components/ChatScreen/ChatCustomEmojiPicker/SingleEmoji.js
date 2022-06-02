import { View, Text, Pressable } from 'react-native'
import React, {PureComponent} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const storage_key = '@emoji-selector:HISTORY'

class SingleEmoji extends PureComponent {

  // state = {history: []}

  // handleEmojiSelect = (emoji) => {
  //   this.addToHistoryAsync(emoji)
  //   console.log(emoji)
  //   this.props.onEmojiSelected(charFromEmojiObject(emoji))
  // }

  // addToHistoryAsync = async (emoji) => {
  //   let history = await AsyncStorage.getItem(storage_key)
  //   let value = []
  //   if (!history) {
  //     let record = Object.assign({}, emoji, { count: 1 })
  //     value.push(record)
  //   } else {
  //     let json = JSON.parse(history)
  //     if (json.filter(r => r.emoji === emoji.emoji).length > 0) value = json
  //     else {
  //       let record = Object.assign({}, emoji, { count: 1 })
  //       value = [record, ...json]
  //     }
  //   }
  //   AsyncStorage.setItem(storage_key, JSON.stringify(value))
  //   this.setState({history: value})
  // }

  
  render() {
    const {item, setMessageText, emojiSize} = this.props

    const handleEmoji = () => {
      setMessageText(prev=> prev + item.emoji)
    }

    return (
      <View >
        <Pressable 
          style={{padding: 5, borderRadius: 10}}
          delayLongPress={70}
          onPress={handleEmoji}>
          <Text style={{fontSize: emojiSize}}>{item.emoji}</Text>
        </Pressable>
    </View>
    )
  }
}

export default SingleEmoji