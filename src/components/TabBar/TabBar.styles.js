import { useMemo } from 'react';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: colors.primaryLight,
    borderTopWidth: 0.5
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles