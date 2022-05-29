const initialState = {
  chats: [],
  contactChat: [],
  currentMessage: null,
  isEmojiOpen: false,
  mediaData: [],
  currentContact: null
}

const chatsReducer = (state= initialState, actions) => {
  switch(actions.type) {
    case 'CHATS_LIST':
      return {...state, chats: actions.payload}
    case 'GET_CHAT_CONTACT':
      return {...state, contactChat: actions.payload}
    case 'CURRENT_CONTACT':
      return {...state, currentContact: actions.payload}
    case 'EMOJI_OPEN':
      return {...state, isEmojiOpen: actions.payload}
    default:
      return state
  }
}

export default chatsReducer