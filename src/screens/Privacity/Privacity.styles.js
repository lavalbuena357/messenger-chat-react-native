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
  optionsContainer: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  itemText: {
    color: colors.textBody
  },
  itemContainerAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    marginBottom: 15,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 0.5
  },
  itemTextAll: {
    color: colors.textBody,
    fontWeight: 'bold',
    fontSize: 16
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles