import { View, Pressable, FlatList } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import  UseDataList from './data'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import useStyles from './ChatCustomEmojiPicker.styles'
import EmojisCategory from './EmojisCategory'

const ChatCustomEmojiPicker = ({isEmojiOpen, messageText, setMessageText}) => {
  const [categorySelected, setCategorySelected] = useState({index: 0, name: 'recently'})
  const [emojisRecently, setEmojisRecently] = useState([])

  const styles = useStyles()
  const renderList = useMemo(() =>UseDataList(emojisRecently), []) 

  const renderItem = useCallback(({item, index}) => (
    <Pressable 
      onPress={() => setCategorySelected({index: index, name: item.name})}
      style={categorySelected.index === index ? styles.categorySelected : styles.category}>
      <IconFAw 
        name={item.icon} 
        size={22} 
        style={categorySelected.index === index ? styles.categoryIconSelected : styles.categoryIcon} />
      </Pressable>  
  ), [categorySelected])

  return (
    <>
      {isEmojiOpen && <View style={styles.contentModal}>
      <View style={styles.container}>
        <FlatList
          data={renderList.categories}
          style={styles.categories}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => [item.category, index]}
          renderItem={renderItem}/>
          <EmojisCategory 
            categorySelected={categorySelected.name} 
            emojiSize={30}
            messageText={messageText}
            setMessageText={setMessageText}
            renderList={renderList._emoji} />
      </View>
    </View>}
    </>
  )
}

export default ChatCustomEmojiPicker