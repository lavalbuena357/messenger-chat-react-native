import { StyleSheet } from 'react-native'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 1,
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
    fontSize: 15
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles