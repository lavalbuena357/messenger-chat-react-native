import { StyleSheet, Dimensions } from 'react-native'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  logo: {
    width: deviceWidth,
    height: deviceHeight,
  }
})