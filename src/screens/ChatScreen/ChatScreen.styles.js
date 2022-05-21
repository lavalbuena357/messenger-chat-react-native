import { StyleSheet } from 'react-native'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.placeholder,
    borderBottomWidth: 0.3,
    padding: 5,
  },
  status: {
    color: colors.placeholder,
    fontSize: 12,
  },
  content: {
    flex: 1, 
    justifyContent: 'flex-start',
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
  emptyChatContainer: {
    padding: 10,
  },
  emptyChat: {
    color: colors.placeholder
  },
  loading: {
    color: colors.white
  },
  buttonAdd: {
    backgroundColor: colors.placeholder,
    padding: 5,
    borderRadius: 20,
  },
  notFound: {
    color: colors.placeholder,
    padding: 10
  },
  loadMore: {
    padding: 5,
    alignSelf:'center',
    backgroundColor: colors.placeholder,
    marginVertical: 5,
    borderRadius:5,
    color: colors.textBody
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles