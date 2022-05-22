import {} from 'react-native'
import React from 'react'
import EmojiPicker from 'rn-emoji-keyboard'
import useStyles from '../ChatInputMessage/ChatInputMessage.styles'

const ChatEmojiPicker = ({
  setIsEmojiOpen, 
  isEmojiOpen, 
  messageText, 
  setMessageText,
  setIsOnlyEmoji}) => {

  const styles = useStyles()
  
  const handlePick = (emojiObject) => {
    if(messageText.length == 0) {
      setIsOnlyEmoji(true)
    }
    setMessageText(messageText + emojiObject.emoji)
  }

  return (
    <EmojiPicker
      onEmojiSelected={handlePick}
      expandable={false}
      open={isEmojiOpen}
      onClose={() => setIsEmojiOpen(false)}
      emojiSize={26}
      onRequestClose={() => setIsEmojiOpen(false)}
      enableRecentlyUsed={true}
      categoryOrder={['recently_used', 'smileys_emotion', 'people_body', 'animals_nature', 'food_drink', 'travel_places', 'activities', 'objects', 'flags', 'symbols']}
      defaultHeight={'50%'}
      categoryContainerColor={styles.emojiCat.backgroundColor}
      categoryColor={styles.emojiCat.color}
      containerStyles={styles.emojiContainer}
      activeCategoryContainerColor={styles.emojiCatSeledted.backgroundColor}
      activeCategoryColor={styles.emojiCatSeledted.color}
      categoryPosition='top'
      hideHeader={true} />
  )
}

export default ChatEmojiPicker