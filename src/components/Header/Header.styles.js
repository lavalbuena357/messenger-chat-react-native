import { useMemo } from 'react';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    position: 'relative',
    backgroundColor: colors.primary,
    elevation: 4,
    shadowColor: colors.shadow,
    zIndex: 100
  },
  left: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 18,
    color: colors.textBody,
    fontWeight: 'bold'
  },
  rightCn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoURL: {
    height: 40,
    width: 40,
    borderRadius: 10,
    marginRight: 15,
  },
  icons: {
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