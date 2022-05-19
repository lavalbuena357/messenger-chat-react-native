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
    backgroundColor: colors.placeholder,
    padding: 5,
  },
  status: {
    color: colors.primary,
    fontSize: 12
  },
  content: {
    flex: 1, 
    justifyContent: 'flex-start',
    backgroundColor: colors.background
  },
  emptyChatContainer: {
    padding: 10,
  },
  emptyChat: {
    color: colors.placeholder
  },
  loading: {
    color: colors.white
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles