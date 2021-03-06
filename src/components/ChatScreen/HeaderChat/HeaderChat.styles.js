import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 5,
    elevation: 4,
    shadowColor: colors.shadow,
    height: 60,
    zIndex:100
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
    padding: 5
  },
  photoURL: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.textBody
  },
  online: {
    fontSize: 12,
    color: colors.online
  },
  offline: {
    fontSize: 12,
    color: colors.offline
  },
  icons: {
    color: colors.textBody
  }
})