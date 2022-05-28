import { View, Text, TouchableHighlight } from 'react-native'
import React, {PureComponent} from 'react'

class SingleEmoji extends PureComponent {
  
  render() {
    const {item, setMessageText, emojiSize} = this.props
    
    return (
      <View >
        <TouchableHighlight 
          style={{padding: 5, borderRadius: 10}} 
          onPress={() => setMessageText(prev=> prev + item.emoji)}>
          <Text style={{fontSize: emojiSize}}>{item.emoji}</Text>
        </TouchableHighlight>
    </View>
    )
  }
}

export default SingleEmoji