import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'

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