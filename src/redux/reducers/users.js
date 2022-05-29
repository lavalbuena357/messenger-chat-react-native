const initialState = {
  currentUser: null
}

const userReducer = (state= initialState, actions) => {
  switch(actions.type) {
    case 'GET_CURRENT_USER': 
      return {...state, currentUser: actions.payload}
    default:
      return state
  }
}

export default userReducer