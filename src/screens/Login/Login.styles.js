import { StyleSheet } from 'react-native'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    width: 170,
    height: 170,
    tintColor: colors.logo
  },
  btnLogin: {
    backgroundColor: colors.button,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    elevation: 10,
    shadowColor: colors.shadow,
  },
  icon: {
    backgroundColor: colors.google,
    padding: 5,
    borderRadius: 30,
    marginRight: 10
  },
  textIcon: {
    color: colors.text,
    marginRight: 5,
    textTransform: 'uppercase',
    fontSize: 13
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