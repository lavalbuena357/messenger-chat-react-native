import { useMemo } from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import { useSelector } from 'react-redux';
import Theme, { vars } from '../../colors/colors'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  logo: {
    width: deviceWidth,
    height: deviceHeight
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles