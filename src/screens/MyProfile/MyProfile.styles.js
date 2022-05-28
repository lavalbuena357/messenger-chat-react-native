import { StyleSheet } from 'react-native'

export const getStyles = ({colors}) => StyleSheet.create({
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
    shadowColor: colors.shadow,
    marginHorizontal: 10
  },
  name: {
    color: colors.textBody,
    fontSize: 16,
    marginRight: 10,
  },
  statusLength: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 10
  },
  email: {
    color: colors.textBody,
    marginVertical: 10,
    textAlign: 'center'
  },
  loader: {
    color: colors.white
  },
  input: {
    borderColor: colors.secondary,
    borderWidth: 0.5,
    marginHorizontal: 15,
    marginTop: 20,
    minWidth: '90%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: colors.textBody,
  },
  placeholder: {
    color: colors.placeholder
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30
  },
  itemPhoto: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 80,
    color: colors.text,
    elevation: 3,
    shadowColor: colors.shadow
  },
  itemText: {
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12
  }
})