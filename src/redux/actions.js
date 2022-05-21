import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import database from '@react-native-firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { webClientId } from '../../env'

/******************************************************
 *+++++++++++++++++++++++ THEME ++++++++++++++++++++++*
 ******************************************************/
export const getTheme = (theme) => {
  return (dispatch) => {
    dispatch({
      type: 'THEME',
      payload: theme
    })
  }
}

/******************************************************
 *+++++++++++++++++++ AUTENTICACION +++++++++++++++++++*
 ******************************************************/
//AUTENTICACION
export const login = async() => {
  try {
    GoogleSignin.configure({
      webClientId: webClientId
    })
    const { idToken } = await GoogleSignin.signIn()
    await AsyncStorage.setItem('googleToken', idToken)
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    const signin = await auth().signInWithCredential(googleCredential)
    const {uid, displayName, email, photoURL} = signin.user
    const userRef = database().ref(`users/${uid}`)
    const isUser = await userRef.once('value')
    if(isUser.val() === null) {
      await userRef.set({uid, displayName, email, photoURL, online: true, status: 'Disponible', blocked: false})
    }
    return {status: 200, message: 'Inicio de sesión correcto'}
  } catch (error) {
    return {status: 400, message: error}
  }
}

//CERRAR SESION
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('googleToken')
    await auth().signOut()
    return {status: 200, message: 'Se cerró sesión correctamente'}
  } catch (error) {console.warn(error)}
}

//CAMBIAR A OFFLINE - INACTIVO - APP EN SEGUNDO PLANO
export const userOffline = async(uid, status) => {
  const usersRefOnline = database().ref(`users/${uid}/online`)
  await usersRefOnline.set(status)
}

//DETECTAR OFFLINE
export const detectOffline = (uid) => {
  try {
    const usersRefOnline = database().ref(`users/${uid}/online`)
    const isOffline = false
    const isOnline = true
    const connectRef = database().ref('.info/connected')
    connectRef.on('value', async(snap) => {
      if(snap.val() === false) return
      await usersRefOnline.onDisconnect().set(isOffline)
      await usersRefOnline.set(isOnline)
    })
  } catch (error) {console.warn(error)}
}

/******************************************************
 *++++++++++++++++++++ USUARIOS ++++++++++++++++++++++*
 ******************************************************/
//OBTENER USUARIO ACTUAL
export const getCurrentUser = () => {
  return (dispatch) => {
    try {
      auth().onAuthStateChanged(async(user) => {
        if(user !== null) {
          detectOffline(user.uid)
          database().ref(`users/${user.uid}`)
          .on('value', snap => {
            dispatch({type: 'GET_CURRENT_USER', payload: snap.val()})
          })
        }
      })
    } catch (error) {console.warn(error)}
  }
}

//OBTENER UN USUARIO POR ID
export const getUserById = async(uid) => {
  try {
    const userRef = database().ref(`users/${uid}`)
    const userVal = await userRef.once('value')
    return userVal.val()
  } catch (error) {console.warn(error)}
}

//CAMBIAR NOMBRE DEL USUARIO
export const changeName = async(uid, name) => {
  try {
    const nameRef = database().ref(`users/${uid}/displayName`)
    await nameRef.set(name)
  } catch (error) {console.warn(error)}
}

//CAMBIAR FOTO DE USUARIO
export const changProfilePic = async(uid, photo) => {
  try {
    const photoRef = database().ref(`users/${uid}/photoURL`)
    await photoRef.set(photo)
  } catch (error) {console.warn(error)}
}

//CAMBIAR ESTADO PARA MOSTRAR
export const changeStatus = async(uid, status) => {
  try {
    const statusRef = database().ref(`users/${uid}/status`)
    await statusRef.set(status)
  } catch (error) {console.warn(error)}
}

/******************************************************
 *++++++++++++++++++++ CONTACTOS +++++++++++++++++++++*
******************************************************/
//AGREGAR UN CONTACTO
export const addContact = async(uid, contactEmail) => {
  try {
    const fixEmail = contactEmail.toLocaleLowerCase().split(' ').join('')
    //verifica que no se agregue a si mismo
    if(fixEmail === auth().currentUser.email) {
      return {status: 400, message: 'No puede agregarse usted mismo'}
    }
    //verifica que sea un usuario registrado en la base de datos
    const usersRef = database().ref('users')
    const usersSnap = await usersRef.once('value')
    let contact = null
    for(let user in usersSnap.val()) {
      if(usersSnap.val()[user].email === fixEmail) {
        contact = usersSnap.val()[user]
        break
      }
    }
    if(!contact) {
      return {status: 400, message: 'Usuario no registrado'}
    } else {
      const contactsRef = database().ref(`contacts/${uid}/${contact.uid}`)
      const userRef = database().ref(`users/${uid}/blocked/${contact.uid}`)
      await contactsRef.set(true)
      await userRef.set(false)
      return {status: 200, message: 'Contacto agregado correctamente'}
    }
  } catch (error) {console.warn(error)}
}

//OBTENER CONTACTOS
export const contactsList = (uid) => {
  return async(dispatch) => {
    try {
      const contactsRef = database().ref(`contacts/${uid}`)
      contactsRef.on('value', (snap) => {
        const snapVal = snap.val()
        const snapKeys = Object.keys(snapVal)
        if(snapVal !== null) {
          let contacts = {}
          for(let contact in snapVal){
            const contactRef = database().ref(`users/${contact}`)
            contactRef.on('value', contactSnap => {
              const contactSnapVal = contactSnap.val()
              contacts = {...contacts, [contact]: contactSnapVal}
              const contactsKeys = Object.keys(contacts)
              if(snapKeys.length === contactsKeys.length) {
                dispatch({
                  type: 'CONTACTS_LIST',
                  payload: {contacts}
                })
              }
            })
          }
        } else {
          dispatch({
            type: 'CONTACTS_LIST',
            payload: {contacts: {}}
          })
        }
      })
    } catch (error) {console.warn(error)}
  }
}

//EDITAR UN CONTACTO
export const editContact = async(uid, contactUid, newName) => {
  try {
    const contactRef = database().ref(`users/${contactUid}/nickname/${uid}`)
    await contactRef.set(newName)
  } catch (error) {console.warn(error)}
}

//ELIMINAR UN CONTACTO
export const removeContact = async(uid, contactUid) => {
  try {
    const contactRef = database().ref(`contacts/${uid}/${contactUid}`)
    await contactRef.remove()
  } catch (error) {console.warn(error)}
}

//BLOQUEAR A UN CONTACTO
export const blockContact = async(uid, contactUid) => {
  try {
    const usersRef = database().ref(`contacts/${uid}/${contactUid}`)
    const userRef = database().ref(`users/${uid}/blocked/${contactUid}`)
    usersRef.remove()
    await userRef.set(true)
  } catch (error) {console.warn(error)}
}

//DESBLOQUEAR A UN CONTACTO
export const unblockContact = async(uid, contactUid) => {
  try {
    const usersRef = database().ref(`contacts/${uid}/${contactUid}`)
    const userRef = database().ref(`users/${uid}/blocked/${contactUid}`)
    usersRef.set(true)
    await userRef.set(false)
  } catch (error) {console.warn(error)}
}

/******************************************************
 *++++++++++++++++++++++ CHATS +++++++++++++++++++++++*
 ******************************************************/
//AGREGAR UN NUEVO CHAT
export const submitChat = (fromUid, toUid, message, cate) => {
  try {
    const date = new Date().getTime()
    const obj = {chatId: date, from: fromUid, to: toUid, message: message.replace(/(\r\n|\n|\r)/gm, ' '), cate, createdAt: date}
    const chatRef = database().ref(`chats/${fromUid}/${toUid}/${date}`)
    const chatContactRef = database().ref(`chats/${toUid}/${fromUid}/${date}`)
    chatRef.set(obj)
    chatContactRef.set(obj)
    return {status: 200, message: 'Chat Agregado correctamente'}
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
export const getChatContact = (uid, uidContact, page) => {
  return async (dispatch) => {
    try {
      const chatRef = database().ref(`chats/${uid}/${uidContact}`).limitToLast(page * 20)
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
          payload: snap.val() === [] ? {} : res
        })
      })
    } catch (error) {console.warn(error)}
  }
}

 //RESETEAR EL CHAT DE CONTACTO
 export const unsubscribeChatContact = (uid, uidContact, page) => {
   return (dispatch) => {
     try {
      const chatRef = database().ref(`chats/${uid}/${uidContact}`).limitToLast(page * 10)
      chatRef.off()
      dispatch({
        type: 'RESET_CHAT_CONTACT'
      })
     } catch (error) {console.warn(error)}
   }
 }