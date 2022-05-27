const json = require('unicode-emoji-json/data-by-group.json')
const fs = require('fs')

let newArray = []
for (const [key, value] of Object.entries(json)) {
  const newData = value
    .map((emoji) => ({
      emoji: emoji.emoji,
      name: emoji.name,
    }))
  newArray.push({
    category: key.replace(/ & /g, '_').replace(/ /g, '_').toLocaleLowerCase(),
    items: newData,
  })
}

fs.writeFile('./src/assets/emojis.json', JSON.stringify(newArray), function (err) {
  if (err) return console.log(err)
  console.log('emojis.json ha sido guardado en la carpeta assets')
})
