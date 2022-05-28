import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    
  },
  icon: {
    color: colors.text,
    marginLeft: 15,
    padding: 5,
    backgroundColor: colors.secondary,
    borderRadius: 5
  },
  loader: {
    color: colors.white
  }
})