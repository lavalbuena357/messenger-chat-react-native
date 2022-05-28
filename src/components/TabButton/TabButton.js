import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './TabButton.styles'

const TabButton = ({icon, tabText, tabBarBadge, selectedTab, onPress}) => {

  const styles = useStyles(getStyles)

  return (
    <TouchableOpacity onPress={onPress} style={selectedTab ? styles.bottomTabContainerSelected : styles.bottomTabContainer}>
      <Icon name={icon} color={selectedTab ? styles.selectedTabTitle.color : styles.tabTitle.color} size={24} />
      <Text style={selectedTab ? styles.selectedTabTitle : styles.tabTitle}>
        {tabText}
      </Text>
      {tabBarBadge !== 0 && (
      <View style={tabBarBadge < 10 ? styles.badgeContainer : styles.extendedBadgeContainer}>
        <Text style={styles.badge}>
          {tabBarBadge < 99 ? tabBarBadge : '99+'}
        </Text>
      </View>
      )}
    </TouchableOpacity>
  )
}

export default TabButton