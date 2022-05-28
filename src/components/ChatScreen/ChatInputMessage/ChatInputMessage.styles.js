import { StyleSheet, Dimensions } from 'react-native'

const deviceWidth = Dimensions.get('window').width;

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 200,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: colors.primary,
    width: deviceWidth * 0.8
  },
  messageInputDisabled: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: colors.placeholder,
    width: deviceWidth * 0.8
  },
  iconButton: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignSelf: 'flex-end'
  },
  iconColor: {
    color: colors.textBody
  },
  text: {
    flex:1,
    color: colors.textBody,
    fontSize: 16
  },
  micButton: {
    paddingHorizontal: 5,
    marginVertical: 5,
    backgroundColor: colors.primary,
    width: deviceWidth * 0.13,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  micButtonDisabled: {
    paddingHorizontal: 5,
    marginVertical: 5,
    backgroundColor: colors.placeholder,
    width: deviceWidth * 0.13,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  emojiContainer : {
    backgroundColor: colors.primary,
  },
  emojiCat : {
    backgroundColor: colors.secondary,
    color: colors.text,
  },
  emojiCatSeledted: {
    backgroundColor: colors.background,
    color: colors.textBody
  }
})