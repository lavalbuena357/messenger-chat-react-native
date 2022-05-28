import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    
  },
  infoCtn: {
    display: 'flex',
    alignItems: 'center',
    margin: 20,
  },
  online: {
    width: 30,
    height: 30,
    backgroundColor: colors.online,
    borderRadius: 15,
    marginTop: 20
  },
  offline: {
    width: 30,
    height: 30,
    backgroundColor: colors.offline,
    borderRadius: 15,
    marginTop: 20
  },
  photoURL: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,
    marginBottom: 5,
    backgroundColor: colors.white
  },
  usernameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
    textAlign: 'center',
    color: colors.textBody
  },
  editBtn: {
    marginLeft: 10
  },
  email: {
    backgroundColor: colors.background,
    padding: 5,
    borderRadius: 20,
    marginTop: 10,
    color: colors.textBody
  },
  icon: {
    color: colors.textBody
  },
  loader: {
    color: colors.white
  }
})