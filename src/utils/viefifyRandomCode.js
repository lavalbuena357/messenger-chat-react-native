const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
export const randomCode = (num) => {
  let result = []
  for ( let i = 0; i < num; i++ ) {
    const random =  characters.charAt(Math.floor(Math.random() * characters.length))
    result.push(random)
  }
  return result.join(' ')
}