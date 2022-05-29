import { StyleSheet, Dimensions } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  modelContentView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 0,
  },
  contentModal: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 30,
    marginVertical: 80,
    marginHorizontal: 60,
    borderRadius: 10,
    minWidth: 150,
    elevation: 3,
    shadowColor: colors.shadow
  },
  before: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: colors.primaryLight,
    bottom: 72,
    right: 80,
    transform: [{rotate: '45deg'}],
    borderRadius: 3
  },
  iconContainer: {
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginHorizontal: 15,
    elevation: 2,
    shadowColor: colors.shadow,
  },
  icon: {
    color: colors.primary,
  },
  modalPreview: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  boxButtons: {
    flexDirection: 'row',
  },
  ButtonPreview: {
    backgroundColor: colors.orange,
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 10
  }
})