import { combineReducers } from 'redux'
import chatsReducer from './reducers/chats'
import userReducer from './reducers/users'
import contactsReducer from './reducers/contacts'
import themeReducer from './reducers/theme'

const rootReducer = combineReducers({
  chatsReducer,
  userReducer,
  contactsReducer,
  themeReducer
})

export default rootReducer 