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
    flex: 1
  },
  categories: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 6,
    borderBottomWidth: 0.3,
    borderBottomColor: colors.secondary
  },
  separator: {
    width: 0.5,
    height: 28,
    backgroundColor: colors.secondary,
    marginHorizontal: 2,
  },
  category: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  categorySelected: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    backgroundColor: colors.secondary,
    borderRadius: 6,
  },
  categoryIcon : {
    color: colors.secondary,
    minWidth: 25,
    textAlign: 'center'
  },
  categoryIconSelected: {
    color: colors.primary,
    minWidth: 25,
    textAlign: 'center'
  },
  emojiButton: {
    padding: 5
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