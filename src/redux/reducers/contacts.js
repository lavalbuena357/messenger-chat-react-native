const initialState = {
  contacts: null,
  currentContactUid: ''
}

const contactsReducer = (state= initialState, actions) => {
  switch(actions.type) {
    case 'CONTACTS_LIST':
      return {...state, contacts: actions.payload}
    case 'CURRENT_CONTACT_UID':
      return {...state, currentContactUid: actions.payload}
    default:
      return state
  }
}

export default contactsReducer