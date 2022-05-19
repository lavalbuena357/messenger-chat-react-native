import { StyleSheet } from 'react-native'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flexDirection: 'row' ,
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingHorizontal: 15,
    position: 'relative',
    marginTop: 10
  },
  containerSelected: {
    flexDirection: 'row' ,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    position: 'relative',
    marginTop: 10
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
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.textBody
  },
  mail: {
    color: colors.textBody,
    fontSize: 10
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles