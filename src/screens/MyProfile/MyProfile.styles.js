import { useMemo } from 'react';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    elevation: 3,
    shadowColor: colors.shadow
  },
  backButton: {
    padding: 5
  },
  headerTitle: {
    color: colors.textBody,
    marginLeft: 10,
    fontSize: 18
  }, 
  infoContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  imageContainer: {},
  photoURL: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 15,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 40
  },
  cameraIcon: {
    color: colors.primary
  },
  nameContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: colors.shadow
  },
  name: {
    color: colors.textBody,
    fontSize: 16,
    marginRight: 10
  },
  email: {
    color: colors.textBody,
    marginVertical: 10
  },
  loader: {
    color: colors.white
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
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles