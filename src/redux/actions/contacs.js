import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

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
        if(snap.val() !== null) {
          let contacts = {}
          for(let contact in snap.val()){
            const contactRef = database().ref(`users/${contact}`)
            contactRef.on('value', contactSnap => {
              const contactSnapVal = contactSnap.val()
              contacts = {...contacts, [contact]: contactSnapVal}
              const contactsKeys = Object.keys(contacts)
              const snapKeys = Object.keys(snap.val())
              if(snapKeys.length === contactsKeys.length) {
                dispatch({
                  type: 'CONTACTS_LIST',
                  payload: contacts
                })
              }
            })
          }
        } else {
          dispatch({
            type: 'CONTACTS_LIST',
            payload: {}
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