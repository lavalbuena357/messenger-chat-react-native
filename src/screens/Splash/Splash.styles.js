import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../colors/colors'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  logo: {
    width: deviceWidth,
    height: deviceHeight
  }
})