import { StyleSheet, Dimensions } from 'react-native'

const deviceHeight = Dimensions.get('window').height;

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    position: 'relative',
    height: deviceHeight - 70,
    backgroundColor: colors.background
  },
  loading: {
    color: colors.white
  },
  notFound: {
    color: colors.placeholder,
    padding: 10
  }
})