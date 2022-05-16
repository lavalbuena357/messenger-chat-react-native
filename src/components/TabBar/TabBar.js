import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import TabButton from '../TabButton/TabButton'
import useStyles from './TabBar.styles'

const TabBar = ({state, descriptors, navigation}) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      {
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
         
          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key
            })

            if(!isFocused && !event.defaultPrevented) {
              navigation.navigate({name: route.name, merge: true})
            }
          }

          return (
            <View
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              style={{flex: 1, alignItems: 'center'}}>
            <TabButton
              icon={options.tabBarIcon}
              tabText={options.tabBarLabel}
              tabBarBadge={options.tabBarBadge}
              selectedTab={isFocused}
              onPress={onPress} />
          </View>
          )
        })
      }
    </View>
  )
}

export default TabBar