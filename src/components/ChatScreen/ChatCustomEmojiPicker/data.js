import { useMemo } from 'react';
import emojisByGroup from '../../../assets/emojis.json'


export const getHeight = (value, screenHeight) => {
  typeof value === 'number' ? value : (screenHeight / 100) * parseInt(value.replace('%', ''), 10)
}


export const CATEGORIES = [
  {
    name: 'smileys_emotion',
    icon: 'smile',
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
  const categories = useMemo(() => {
    let data = CATEGORIES.map((category) => {
      let icon = category.icon
      let name = category.name
      return {icon, name}
    })
    return data
  }, [])
  
  return categories
}

export const UseDataEmojis = () => {
  const _emoji = useMemo(() => {
    let data = emojisByGroup
    return data
  }, [])
  return _emoji
}