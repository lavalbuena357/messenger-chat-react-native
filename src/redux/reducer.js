const initialState = {
  theme: 'light',
  currentUser: null,
  chats: null,
  contactChat: null,
  contacts: null,
  contactsBlocked: null,
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
      const resContacts = Object.keys(actions.payload.contacts).length > 0 ? actions.payload.contacts : null
      const resContactsBlocked = Object.keys(actions.payload.contactsBlocked).length > 0 ? actions.payload.contactsBlocked : null
      return {...state, contacts: resContacts, contactsBlocked: resContactsBlocked }
    default:
      return state
  }
}

export default reducer