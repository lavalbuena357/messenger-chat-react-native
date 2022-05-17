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
    await userRef.set({uid, displayName, email, photoURL, online: true})
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
      await contactsRef.set(true)
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
        let contacts = {}
        let contactsBlocked = {}
        for(let contact in snap.val()){
          const contactRef = database().ref(`users/${contact}`)
          contactRef.on('value', contactSnap => {
            if(snap.val()[contact]) {contacts = {...contacts, [contact]: contactSnap.val()}} 
            else {contactsBlocked = {...contactsBlocked, [contact]: contactSnap.val()}}
            const snapKeys = Object.keys(snap.val())
            const contactsKeys = Object.keys(contacts)
            const contactsBlokedKeys = Object.keys(contactsBlocked)
            if(snapKeys.length === (contactsKeys.length + contactsBlokedKeys.length)) {
              dispatch({
                type: 'CONTACTS_LIST',
                payload: {contacts, contactsBlocked}
              })
            }
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