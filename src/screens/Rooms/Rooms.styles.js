import { StyleSheet, Dimensions } from 'react-native'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'

const deviceHeight = Dimensions.get('window').height;

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    position: 'relative',
    height: deviceHeight - 70,
    backgroundColor: colors.background
  },
  loading: {
    color: colors.white
  },
  notFound: {
    color: colors.placeholder,
    padding: 10
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles