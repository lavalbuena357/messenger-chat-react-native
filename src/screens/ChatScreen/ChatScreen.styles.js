import { StyleSheet, Dimensions } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const deviceHeight = Dimensions.get('window').height

const getStyles = ({colors, height}) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.background,
    borderBottomWidth: 0.3,
    padding: 0,
  },
  status: {
    color: colors.placeholder,
    fontSize: 12,
  },
  aboveKeyboard: {
    height: deviceHeight - height - 75.3,
  },
  aboveKeyboardHidden: {
    height: deviceHeight - 75.3
  },
  content: {
    flex: 1, 
    justifyContent: 'flex-start',
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
  emptyChatContainer: {
    padding: 10,
  },
  emptyChat: {
    color: colors.placeholder
  },
  loading: {
    color: colors.white
  },
  buttonAdd: {
    backgroundColor: colors.placeholder,
    padding: 5,
    borderRadius: 20,
  },
  notFound: {
    color: colors.placeholder,
    padding: 10
  },
  loadMore: {
    padding: 5,
    alignSelf:'center',
    backgroundColor: colors.placeholder,
    marginVertical: 5,
    borderRadius:5,
    color: colors.textBody
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