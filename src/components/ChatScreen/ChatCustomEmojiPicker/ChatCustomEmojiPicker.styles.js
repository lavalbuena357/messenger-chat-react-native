import { StyleSheet, Dimensions } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../../colors/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const getStyles = ({colors, height}) => StyleSheet.create({
  contentModal: {
    backgroundColor: colors.primary,
    // height: height,
    position: 'absolute',
    bottom: -height - 10,
    top: deviceHeight - height
  },
  contentModalHidden: {
    backgroundColor: colors.primary,
    // height: height,
    position: 'absolute',
    bottom: 0,
    top: deviceHeight,
  },
  categories: {
    height: 50,
    width: deviceWidth,
    justifyContent: 'center',
  },
  category: {
    position: 'relative',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 1
  },
  categorySelected: {
    backgroundColor: colors.primaryLight,
    borderRadius: 6,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 1
  },
  separator: {
    position: 'absolute',
    height: 2,
    width: '80%',
    backgroundColor: colors.orange,
    bottom: 0
  },
  emojisContainer: {
    paddingHorizontal: 10, 
    alignItems: 'center', 
    backgroundColor: colors.primary
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
  const theme = useSelector(state => state.themeReducer.theme)
  const { colors } = Theme[theme]

  useEffect(() => {
    (async() => {
      const value = await AsyncStorage.getItem('height')
      setHeight(parseInt(value))
    })()
  }, [])

  const styles = useMemo(() => getStyles({colors, height}), [colors, height])

  return styles
}

export default useStyles