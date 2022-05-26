import { useMemo } from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const deviceWidth = Dimensions.get('window').width;

const getStyles = ({colors}) => StyleSheet.create({
  modelContentView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 0,
  },
  contentModal: {
    position: 'relative',
    backgroundColor: colors.light,
    padding: 22,
    marginVertical: 80,
    marginHorizontal: 60,
    borderRadius: 10,
    elevation: 3,
    shadowColor: colors.shadow
  },
  before: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: colors.light,
    bottom: 72,
    right: 80,
    transform: [{rotate: '45deg'}],
    borderRadius: 3
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles