const json = require('unicode-emoji-json/data-by-group.json')
const fs = require('fs')

const newArray = []
for (const [key, value] of Object.entries(json)) {
  const newData = value
    .filter((emoji) => parseFloat(emoji.unicode_version) < 12)
    .map((emoji) => ({
      emoji: emoji.emoji,
      name: emoji.name,
      v: emoji.unicode_version,
    }))
  newArray.push({
    title: key.replace(/ & /g, '_').replace(/ /g, '_').toLocaleLowerCase(),
    data: newData,
  })
}

fs.writeFile('./src/assets/emojis.json', JSON.stringify(newArray), function (err) {
  if (err) return console.log(err)
  console.log('emojis.json ha sido guardado en la carpeta assets')
})
