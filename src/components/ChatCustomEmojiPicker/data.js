import {  } from 'react';
import emojisByGroup from '../../assets/emojis.json'


export const getHeight = (value, screenHeight) => {
  console.log(value, screenHeight)
  typeof value === 'number' ? value : (screenHeight / 100) * parseInt(value.replace('%', ''), 10)
}


export const CATEGORIES = [
  {
    name: 'smileys_emotion',
    icon: 'smile'
  },
  {
    name: 'people_body',
    icon: 'user-friends'
  },
  {
    name: 'animals_nature',
    icon: 'paw'
  },
  {
    name: 'food_drink',
    icon: 'apple-alt'
  },
  {
    name: 'travel_places',
    icon: 'city'
  },
  {
    name: 'activities',
    icon: 'futbol'
  },
  {
    name: 'objects',
    icon: 'glasses'
  },
  {
    name: 'symbols',
    icon: 'mercury'
  },
  {
    name: 'flags',
    icon: 'flag'
  },
];

export const useDataCategories = () => {
  let categories = CATEGORIES.map((category) => {
    let icon = category.icon
    let name = category.name
    return {icon, name}
  })
  categories.unshift({
    icon: 'clock',
    name: 'recently'
  })
  return categories
}

export const UseDataEmojis = (recently) => {
  let _emoji = emojisByGroup.reduce((acc, item) => {
    const { category, items } = item;
    if (!acc[category]) acc[category] = []
    acc[category].push(items)
    return acc
  }, {})
  _emoji.recently = [recently]
  return _emoji
}

{/* <Pressable
      onPress={() => setCategorySelected({index, name: item.name})}
      style={categorySelected.index === index ? styles.categorySelected : styles.category}>
      <IconFAw 
        name={item.icon} 
        size={22} 
        style={categorySelected.index === index ? styles.categoryIconSelected : styles.categoryIcon} />
        {categorySelected.index === index &&<View style={styles.separator} />}
    </Pressable> */}