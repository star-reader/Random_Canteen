const getRandomString = (length: number) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const getAuthorizationByHeader = (auth: string | null | undefined) => {
    if (!auth) return ''
    try {
        return auth.split('Bearer ')[1]
    } catch (error) {
        return ''
    }
}

export {
    getRandomString,
    getAuthorizationByHeader
}