import { StyleSheet, Dimensions } from 'react-native'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 200,
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: '#00000050'
  }
})