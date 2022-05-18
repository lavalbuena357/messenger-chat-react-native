import { useMemo } from 'react';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  modalContentView: {
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
  button: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.textBody,
    marginLeft: 10,
  },
  buttonClose: {
    color: colors.notification,
    marginLeft: 10
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