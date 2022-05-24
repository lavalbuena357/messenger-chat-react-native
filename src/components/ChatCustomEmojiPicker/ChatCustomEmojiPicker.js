import { View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import emoji from './data'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import useStyles from './ChatCustomEmojiPicker.styles'

const ChatCustomEmojiPicker = ({isEmojiOpen}) => {
  const [categorySelected, setCategorySelected] = useState(0)

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
            <TouchableOpacity 
              onPress={() => setCategorySelected(el.index)}
              style={categorySelected === el.index ? styles.categorySelected : styles.category}>
              <IconFAw 
                name={el.item.icon} 
                size={22} 
                style={categorySelected === el.index ? styles.categoryIconSelected : styles.categoryIcon} />
            </TouchableOpacity> 
            ) 
          }/>
      </View>
    </View>}
    </>
  )
}

export default ChatCustomEmojiPicker