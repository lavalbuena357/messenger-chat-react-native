import { StyleSheet, Dimensions } from 'react-native'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'

const deviceHeight = Dimensions.get('window').height;

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    position: 'relative',
    height: deviceHeight - 70
  },
  loading: {
    color: colors.white
  },
  notFound: {
    margin: 20,
    color: colors.textBody
  },
  buttonAddcontainer: {
    position: 'absolute',
    top: deviceHeight - 150,
    right: 20
  },
  iconContainer: {
    backgroundColor: colors.button,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  iconAdd: {
    color: colors.primary
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles