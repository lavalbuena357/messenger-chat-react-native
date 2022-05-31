const emoji = require('emoji-datasource')
const fs = require('fs')

const filteredEmojis = emoji.map(e => {
  const emojiUt16 = String.fromCodePoint(...e.unified.split("-").map(u => "0x" + u))
  return {
    category: e.category,
    emoji: emojiUt16,
    name: e.name,
    sort_order: e.sort_order
  }
})

fs.writeFile('./src/assets/emojis.json', JSON.stringify(filteredEmojis), function (err) {
  if (err) return console.log(err)
  console.log('emojis.json ha sido guardado en la carpeta assets')
})
