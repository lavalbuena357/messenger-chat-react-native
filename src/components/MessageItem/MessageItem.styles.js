import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginVertical: 2,
    elevation: 3,
    shadowColor: colors.shadow
  },
  prevContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: colors.shadow
  },
  messageMe : {
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    maxWidth: '85%',
  },
  messageContact: {
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.placeholder,
    borderRadius: 10,
    maxWidth: '85%'
  },
  photoURL: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: colors.white
  },
  messageText: {
    color: colors.textBody,
    fontSize: 20
  },
  messageTextOnlyEmoji: {
    fontSize: 42,
    alignSelf: 'center',
  }
})