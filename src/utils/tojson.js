const json = require('unicode-emoji-json/data-by-group.json')
const fs = require('fs')

let newArray = {}
for (const [key, value] of Object.entries(json)) {
  const keySort = key.replace(/ & /g, '_').replace(/ /g, '_').toLocaleLowerCase()
  const data = value
    .filter((emoji) => {
      return parseFloat(emoji.unicode_version) !== 13.0 && 
      parseFloat(emoji.unicode_version) !== 14.0 
      // (emoji.emoji.length <5 && keySort === 'smileys_emotion')
    })
    .map((emoji) => {
      const obj = {
        emoji: emoji.emoji,
        name: emoji.name,
      }
      return obj
    })
    newArray = {...newArray, [keySort]: data}
}

fs.writeFile('./src/assets/emojis.json', JSON.stringify(newArray), function (err) {
  if (err) return console.log(err)
  console.log('emojis.json ha sido guardado en la carpeta assets')
})
