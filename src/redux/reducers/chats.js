const initialState = {
  chats: [],
  contactChat: [],
  currentMessage: null,
  isEmojiOpen: false,
  mediaData: [],
  currentContact: []
}

const chatsReducer = (state= initialState, actions) => {
  switch(actions.type) {
    case 'CHATS_LIST':
      return {...state, chats: actions.payload}
    case 'GET_CHAT_CONTACT':
      return {...state, contactChat: actions.payload}
    default:
      return state
  }
}

export default chatsReducer