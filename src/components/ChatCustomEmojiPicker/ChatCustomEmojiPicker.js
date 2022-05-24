import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import emoji, { getHeight } from './data'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import useStyles from './ChatCustomEmojiPicker.styles'

const ChatCustomEmojiPicker = ({isEmojiOpen}) => {
  const [categorySelected, setCategorySelected] = useState(null)

  const styles = useStyles()

  return (
    <>
      {isEmojiOpen && <View style={styles.contentModal}>
      <View style={{alignItems: 'center', flexWrap: 'nowrap'}}>
        <FlatList
          data={emoji}
          style={styles.categories}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => [item.category, index]}
          renderItem={(el, i) => (
            <TouchableOpacity style={styles.category}>
              <IconFAw nativeID={i} name={el.item.icon} size={24} style={styles.categoryIcon} />
            </TouchableOpacity> 
            ) 
          }/>
      </View>
    </View>}
    </>
  )
}

export default ChatCustomEmojiPicker