import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    position: 'relative',
    backgroundColor: colors.primary,
    elevation: 2,
    shadowColor: colors.shadow,
    zIndex: 100
  },
  left: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 18,
    color: colors.textBody,
    fontWeight: 'bold'
  },
  rightCn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoURL: {
    height: 40,
    width: 40,
    borderRadius: 10,
    marginRight: 15,
  },
  icons: {
    color: colors.textBody
  }
})