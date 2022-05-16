const initialState = {
  theme: 'light',
  currentUser: null,
}

const reducer = (state = initialState, actions) => {
  switch(actions.type) {
    case 'THEME':
      return {...state, theme: actions.payload}
    case 'GET_CURRENT_USER': 
      return {...state, currentUser: actions.payload}
    default:
      return state
  }
}

export default reducer