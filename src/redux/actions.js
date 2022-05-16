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