import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerSelected: {
    flexDirection: 'row' ,
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingHorhopadding0ertical: 15,
    backgroundColor: colors.primary,
  },
  left: {
    flexDirection: 'row',
    position: 'relative'
  },
  online: {
    height: 15,
    width: 15,
    backgroundColor: colors.online,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 100,
    left: -5
  },
  offline: {
    height: 15,
    width: 15,
    backgroundColor: colors.offline,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 100,
    left: -5
  },
  photoURL: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.light
  },
  info: {
    marginLeft: 10,
    justifyContent: 'space-evenly'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.textBody
  },
  nameBlocked: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.placeholder
  },
  message: {
    color: colors.textBody,
  },
  messageBlocked: {
    color: colors.placeholder,
  },
  messageMediaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 10,
    fontStyle: 'italic',
    color: colors.textBody,
    alignSelf: 'flex-end'
  },
})