import { View, Text, TouchableOpacity } from 'react-native'
import React, {memo, PureComponent} from 'react'

class SingleEmoji extends PureComponent {
  
  render() {
    const {item, setMessageText, emojiSize} = this.props
    
    return (
      <View >
        <TouchableOpacity 
          style={{padding: 5, borderRadius: 10}} 
          onLongPress={() => setMessageText(prev=> prev + item.emoji)}
          delayLongPress={10} >
          <Text style={{fontSize: emojiSize}}>{item.emoji}</Text>
        </TouchableOpacity>
    </View>
    )
  }
}

export default SingleEmoji