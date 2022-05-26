import { useWindowDimensions } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import emoji, { CATEGORIES } from './data'

export const defaultEmojiCongif = {
  open: false,
  onClose: () => {},
  onEmojiSelected: (_emoji) => {},
  emojiSize: 28,
  containerStyles: {},
  defaultHeight: '40%',
  backdropColor: '#00000055',
  categoryTextColor: '#000000',
  categoryContainerColor: '#e3dbcd',
  activeCategoryTextColor: '#005b96',
  activeCategoryContainerColor: '#ffffff',
  onCategoryChangeFailed: (info) => {console.warn(info)},
  categoryPosition: 'top',
  categoryOrder: [...CATEGORIES],
  onRequestClose: () => {},
  categoryContainerStyles: {},
  disableSafeArea: false,
}

// export const defaultEmojiValues = {
//   activeCategoryIndex: 0,
//   setActiveCategoryIndex: () => {},
//   numberOfColumns: 5,
//   width: 0,
//   renderList: [],
// }

// export const EmojiData = useMemo(props => {
//   const { width } = useWindowDimensions()
//   const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
//   const [recentlyUsed, seRecentlyUsed] = useState([])

//   const numberOfColumns = useRef(Math.floor(width / ((props.emojiSize ? props.emojiSize : defaultEmojiCongif.emojiSize) * 2)))

//   useEffect(() => {
//     if(props.open) {
//       setActiveCategoryIndex(0)
//     }
//   }, [props.open])

//   const renderList = useMemo(() => {
//     let data = emoji
//     data.push({
//       icon: 'clock',
//       data: recentlyUsed
//     })
//     if(props.categoryOrder) {
//       const orderedData = props.categoryOrder.flatMap(icon =>
//         data.filter((el) => el.icon === icon)
//       )
//       const restData = data.filter(el => !props?.categoryOrder?.includes(el.icon))
//       data = [...orderedData, ...restData]
//     }
//     return data
//   }, [recentlyUsed, props.categoryOrder])

//   const value = {
//     ...defaultEmojiCongif,
//     ...defaultEmojiValues,
//     ...props,
//     activeCategoryIndex,
//     setActiveCategoryIndex,
//     numberOfColumns: numberOfColumns.current,
//     width,
//     renderList
//   }

//   return {value}

// })

// EmojiData.displayName = 'EmojiData'