import { StyleSheet, Dimensions } from 'react-native'

const deviceWidth = Dimensions.get('window').width;

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.secondary,
    bottom: 10,
    height: 50,
    left: 10,
    right: -10,
    borderRadius: 10,
    width: deviceWidth * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: colors.primaryLight,
    marginHorizontal: 5
  },
  inidicator: {
    color: colors.orange
  }
})