import { useMemo } from 'react';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    
  },
  icon: {
    color: colors.text,
    marginLeft: 15,
    padding: 5,
    backgroundColor: colors.secondary,
    borderRadius: 5
  },
  loader: {
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