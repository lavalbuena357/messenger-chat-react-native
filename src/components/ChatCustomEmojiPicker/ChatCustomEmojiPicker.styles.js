import { StyleSheet, Dimensions } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'
import UseKeyboard from './UseKeyboard'

const deviceWidth = Dimensions.get('window').width

const getStyles = ({colors, height}) => StyleSheet.create({
  contentModal: {
    backgroundColor: colors.primary,
    height: height,
  },
  container: {
    // flex: 1,
    alignSelf: 'flex-start'
  },
  categories: {
    // flex: 1,
    flexDirection: 'row',
    height: 55,
    paddingTop: 6,
    paddingBottom: 6,
    borderBottomWidth: 0.3,
    borderBottomColor: colors.secondary,
    width: deviceWidth,
  },
  category: {
    position: 'relative',
    borderRadius: 6,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  categorySelected: {
    backgroundColor: colors.primaryLight,
    borderRadius: 6,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  separator: {
    position: 'absolute',
    height: 2,
    width: '80%',
    backgroundColor: colors.orange,
    bottom: 0
  },
  categoryIcon : {
    color: colors.secondary,
  },
  categoryIconSelected: {
    color: colors.orange,
  },
  emojiButton: {
    padding: 5,
  }
})

const useStyles = () => {
  const [height, setHeight] = useState(0)
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]
  const keyboardHeight = UseKeyboard()

  useEffect(() => {
    if(keyboardHeight > 0) {
      setHeight(keyboardHeight)
    }
  }, [keyboardHeight])

  const styles = useMemo(() => getStyles({colors, height}), [colors, height])

  return styles
}

export default useStyles