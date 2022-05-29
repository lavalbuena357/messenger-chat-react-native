import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'

/******************************************************
 *++++++++++++++++++++++ CHATS +++++++++++++++++++++++*
 ******************************************************/
//AGREGAR UN NUEVO CHAT
export const submitChat = (fromUid, toUid, message, cate) => {
  try {
    const date = new Date().getTime()
    const obj = {chatId:`${fromUid}${date}`,from:fromUid,to:toUid,message:message.replace(/(\r\n|\n|\r)/gm, ' '),cate,createdAt:date}
    const chatRef = database().ref(`chats/${fromUid}/${toUid}/${date}`)
    const chatContactRef = database().ref(`chats/${toUid}/${fromUid}/${date}`)
    chatRef.set(obj)
    chatContactRef.set(obj)
  } catch (error) {console.warn(error)}
}

//GUARDAR MEDIA EN EL ALMACENAMIENTO DE FIRESTORE
export const saveMedia = async(file, metadata, filename, cate, fromUid, toUid) => {
  try {
    const storageRef = storage().ref(`media/${filename}`)
    const upload = await storageRef.putString(file, 'base64', {customMetadata: metadata})
    if(upload.state === 'success') {
      const url = await storageRef.getDownloadURL()
      const date = new Date().getTime()
      const mediaMessage = {chatId:`${fromUid}${date}`,from:fromUid,to:toUid,message:url,cate,metadata,createdAt:date}
      const chatRef = database().ref(`chats/${fromUid}/${toUid}/${date}`)
      const chatContactRef = database().ref(`chats/${toUid}/${fromUid}/${date}`)
      chatRef.set(mediaMessage)
      chatContactRef.set(mediaMessage)
    }
  } catch (error) {console.warn(error)}
}

//OBTENER CHATS
export const chatsList = (uid) => {
  return (dispatch) => {
    try {
      const chatsRef = database().ref(`chats/${uid}`)
      chatsRef.on('value', snap => {
        let chats = {}
        const obj = snap.val()
        for(let item in obj) {
          const keys = Object.keys(obj[item]).sort((a,b) => b-a)
          chats = {...chats, [item]: {...obj[item][keys[0]], with: item}}
        }
        const sortChats = (x, y) => {
          const f1 = new Date(x.createdAt)
          const f2 = new Date(y.createdAt)
          if(f1 < f2) {return 1}
          if(f1 > f2) {return -1}
          return 0
        }
        const res = Object.values(chats).sort(sortChats)
        dispatch({type: 'CHATS_LIST', payload: res})       
      })
    } catch (error) {console.warn(error)}
  }
}

//OBTENER CHAT POR ID
export const getChatContact = (uid, uidContact) => {
  return async (dispatch) => {
    try {
      const chatRef = database().ref(`chats/${uid}/${uidContact}`)
      chatRef.on('value', async(snap) => {
        let chats = {}
        const obj = await snap.val()
        for(let item in obj ) {
          const newChat = {...obj[item], with: uidContact}
          chats = {...chats, [item]: newChat}
        }
        const sortChats = (x, y) => {
          const f1 = new Date(x.createdAt)
          const f2 = new Date(y.createdAt)
          if(f1 > f2) {return 1}
          if(f1 < f2) {return -1}
          return 0
        }
        const res = Object.values(chats).sort(sortChats)
        dispatch({
          type: 'GET_CHAT_CONTACT',
          payload: snap.val() === null ? [] : res
        })
      })
    } catch (error) {console.warn(error)}
  }
}

 //RESETEAR EL CHAT DE CONTACTO
 export const unsubscribeChatContact = (uid, uidContact) => {
   return (dispatch) => {
     try {
      const chatRef = database().ref(`chats/${uid}/${uidContact}`)
      chatRef.off()
      dispatch({
        type: 'RESET_CHAT_CONTACT'
      })
     } catch (error) {console.warn(error)}
   }
 }

//OBTENER EL ESTADO DE LOS EMOJIS
export const getEmojisState = (toState) => {
  return async(dispatch) => {
      dispatch({
        type: 'EMOJI_OPEN',
        payload: toState
      })
  }
}