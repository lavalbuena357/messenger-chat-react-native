import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import database from '@react-native-firebase/database'

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
const webClientId = process.env.REACT_APP_WEB_CLIENT_ID

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