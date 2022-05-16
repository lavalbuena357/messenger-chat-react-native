import { useMemo } from 'react';
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import Theme from '../../colors/colors'

const getStyles = ({colors}) => StyleSheet.create({
  bottomTabContainer: {
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'flex-end'  
  },
  bottomTabContainerSelected: {
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.button,
    borderRadius: 10,
    elevation: 3,
    shadowColor: colors.shadow
  },
  tabTitle: {
    fontSize: 9,
    color: colors.secondary,
    marginTop: 3,
    marginBottom: 3,
   },
  selectedTabTitle: {
    fontSize: 9,
    color: colors.text,
    marginTop: 3,
    marginBottom: 3,
  },
  badgeContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 8,
    right: 6,
    backgroundColor: colors.notification,
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  extendedBadgeContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 8,
    right: 0,
    backgroundColor: colors.notification,
    height: 16,
    width: 22,
    borderRadius: 8,
  },
  badge: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors.white,
  }
})

const useStyles = () => {
  const theme = useSelector(state => state.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles