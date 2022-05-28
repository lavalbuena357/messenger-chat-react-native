import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    width: 150,
    height: 150,
  },
  btnLogin: {
    backgroundColor: colors.button,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    elevation: 10,
    shadowColor: colors.shadow,
  },
  icon: {
    backgroundColor: colors.google,
    padding: 5,
    borderRadius: 30,
    marginRight: 10
  },
  textIcon: {
    color: colors.text,
    marginRight: 5,
    textTransform: 'uppercase',
    fontSize: 13
  },
  loading: {
    color: colors.white
  }
})