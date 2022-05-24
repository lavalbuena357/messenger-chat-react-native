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

const _emoji = emojisByGroup.reduce((acc, item) => {
  const { title, data } = item;
  if (!acc[title]) acc[title] = []
  acc[title].push(data)
  return acc
}, {})

const emoji = CATEGORIES.map((category) => {
  let items = _emoji[category.name][0] || []
  let icon = category.icon
  return { icon, items }
});

export default emoji