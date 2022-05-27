import { View, Text, Pressable } from 'react-native'
import React, {PureComponent} from 'react'

class SingleEmoji extends PureComponent {
  
  render() {
    const {item, setMessageText, emojiSize} = this.props
    
    return (
      <View >
        <Pressable 
          style={({pressed}) => [
            {padding: 5, 
              backgroundColor: pressed ?'#ff840030' : '#ffffff00'
            }
          ]} 
          onPress={() => setMessageText(prev=> prev + item.emoji)}>
          <Text style={{fontSize: emojiSize}}>{item.emoji}</Text>
        </Pressable>
    </View>
    )
  }
}

export default SingleEmoji