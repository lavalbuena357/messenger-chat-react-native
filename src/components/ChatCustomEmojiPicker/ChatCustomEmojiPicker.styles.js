import { StyleSheet, Dimensions } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'
import UseKeyboard from './UseKeyboard'

const deviceHeight = Dimensions.get('window').height

const getStyles = ({colors, height}) => StyleSheet.create({
  height: height,
  contentModal: {
    backgroundColor: colors.primary,
    height: height,
  },
  categories: {
    paddingTop: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
  separator: {
    width: 0.5,
    height: 28,
    backgroundColor: colors.secondary,
    marginHorizontal: 4,
  },
  category: {
    padding: 3,
    borderRadius: 6,
  },
  categorySelected: {
    padding: 3,
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