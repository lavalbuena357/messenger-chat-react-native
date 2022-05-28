import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  }
})