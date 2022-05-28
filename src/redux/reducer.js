const initialState = {
  theme: 'light',
  currentUser: null,
  chats: [],
  contactChat: [],
  contacts: null,
  emojiCategorySelected: {index: 0, name: 'smileys_emotion'}
}

const reducer = (state = initialState, actions) => {
  switch(actions.type) {
    case 'THEME':
      return {...state, theme: actions.payload}
    case 'GET_CURRENT_USER': 
      return {...state, currentUser: actions.payload}
    case 'LOGOUT': 
      return {...state, currentUser: actions.payload}
    case 'CONTACTS_LIST':
      return {...state, contacts: actions.payload }
    case 'CHATS_LIST':
      return {...state, chats: actions.payload }
    case 'GET_CHAT_CONTACT':
      return {...state, contactChat: actions.payload}
    case 'RESET_CHAT_CONTACT':
      return {...state, contactChat: []}
    case 'SET_EMOJI_CATEGORY':
      return {...state, emojiCategorySelected: actions.payload}
    default:
      return state
  }
}

export default reducer