import { useMemo } from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const deviceWidth = Dimensions.get('window').width;

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 200,
    paddingHorizontal: 5,
    backgroundColor: colors.primary,
    paddingBottom: 5,
    // marginBottom: 5
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    backgroundColor: colors.primaryLight,
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
  },
  micButton: {
    paddingHorizontal: 5,
    backgroundColor: colors.primaryLight,
    width: deviceWidth * 0.13,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles