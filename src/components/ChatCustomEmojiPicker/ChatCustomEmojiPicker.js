import { View, Pressable, ScrollView} from 'react-native'
import React, { useMemo, useState } from 'react'
import  { useDataCategories } from './data'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import useStyles from './ChatCustomEmojiPicker.styles'
import EmojisCategory from './EmojisCategory'
import emojisByGroup from '../../assets/emojis.json'

const ChatCustomEmojiPicker = ({
  isEmojiOpen, 
  messageText, 
  setMessageText,
  setIsOnlyEmoji}) => {
  const [categorySelected, setCategorySelected] = useState({index: 1, name: 'smileys_emotion'})
  const [emojisRecently, setEmojisRecently] = useState([])

  const styles = useStyles()
  const renderEmojis= useMemo(() => { 
    const _emoji = emojisByGroup
    // let _emoji = emojisByGroup.reduce((acc, item) => {
    //   const { category, items } = item;
    //   if (!acc[category]) acc[category] = []
    //   acc[category].push(items)
    //   return acc
    // }, {})
    // _emoji.recently = [emojisRecently]
    return _emoji
  }, [])
  const renderCategories = useMemo(() => useDataCategories())

  const CategoriesList = () => (
    <View style={styles.categories}>
      {renderCategories.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => setCategorySelected({index, name: item.name})}
          style={categorySelected.index === index ? styles.categorySelected : styles.category}>
          <IconFAw 
            name={item.icon} 
            size={22} 
            style={categorySelected.index === index ? styles.categoryIconSelected : styles.categoryIcon} />
            {categorySelected.index === index &&<View style={styles.separator} />}
        </Pressable>
      ))}
    </View>
  )
  return (
    <>
      {isEmojiOpen && <View style={styles.contentModal}>
      <CategoriesList />
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // onScrollEndDrag={() => setCategorySelected({index: categorySelected.index+1, name: renderCategories[categorySelected.index+1].name})}
        style={styles.container}>
        <EmojisCategory 
            categorySelected={categorySelected.name} 
            emojiSize={26}
            messageText={messageText}
            setMessageText={setMessageText}
            renderList={renderEmojis}
            setIsOnlyEmoji={setIsOnlyEmoji}
            setEmojisRecently={setEmojisRecently}
            emojisRecently={emojisRecently}
            ListHeaderComponent={<CategoriesList />} />
      </ScrollView>
    </View>}
    </>
  )
}

export default ChatCustomEmojiPicker