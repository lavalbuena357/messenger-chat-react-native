import { StyleSheet, Dimensions } from 'react-native'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Theme from '../../colors/colors'

const deviceHeight = Dimensions.get('window').height;

const getStyles = ({colors}) => StyleSheet.create({
  modelContentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentModal: {
    position: 'relative',
    backgroundColor: colors.background,
    paddingVertical: 22,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  upLine: {
    position: 'absolute',
    top: 6,
    height: 4, 
    width: 40,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    alignSelf: 'center'
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 35,
    paddingTop: 5,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 0.5
  },
  icon: {
    color: colors.text,
    marginLeft: 15,
    padding: 5,
    backgroundColor: colors.secondary,
    borderRadius: 5
  },
  contentModalTitle: {
    fontSize: 15,
    color: colors.textBody,
    marginLeft: 10
  },
  loader: {
    color: colors.white
  },
  nameLength: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 10,
    color: colors.text
  },
  input: {
    borderColor: colors.secondary,
    borderWidth: 0.5,
    marginHorizontal: 15,
    marginTop: 30,
    minWidth: '90%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: colors.textBody,
  },
  placeholder: {
    color: colors.placeholder
  },
  textButton: {
    marginHorizontal: 15,
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: colors.secondary
  },
  textButtonText: {
    textTransform: 'uppercase',
    color: colors.text,
    fontWeight: 'bold'
  },
  iconButton: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    marginBottom: 10,
  },
  iconButtonText: {
    color: colors.textBody,
    marginLeft: 10,
  },
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles