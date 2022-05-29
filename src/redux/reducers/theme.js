const initialState = {
  theme: 'light',
}

const themeReducer = (state= initialState, actions) => {
  switch(actions.type) {
    case 'THEME':
      return {...state, theme: actions.payload}
    default:
      return state
  }
}

export default themeReducer