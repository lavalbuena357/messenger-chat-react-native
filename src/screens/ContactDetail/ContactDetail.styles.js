import { useMemo } from 'react';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    
  },
  infoCtn: {
    display: 'flex',
    alignItems: 'center',
    margin: 20,
  },
  online: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: colors.online,
    borderRadius: 10,
    top: 30,
  },
  offline: {
    width: 30,
    height: 30,
    backgroundColor: colors.offline,
    borderRadius: 15,
    marginTop: 20
  },
  photoURL: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,
    marginBottom: 5,
    backgroundColor: colors.white
  },
  usernameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
    textAlign: 'center',
    color: colors.textBody
  },
  editBtn: {
    marginLeft: 10
  },
  email: {
    backgroundColor: colors.background,
    padding: 5,
    borderRadius: 20,
    marginTop: 10,
    color: colors.textBody
  },
  icon: {
    color: colors.textBody
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