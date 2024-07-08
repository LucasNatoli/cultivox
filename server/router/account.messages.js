const MSG_INVALID_TOKEN = 'Invalid authorization header.'
const MSG_INVALID_CREDENTIALS = 'Las credenciales provistas no son válidas. Intentalo nuevamente.'

module.exports = {
  InvalidToken: () => {
    return { message: MSG_INVALID_TOKEN}
  }, 
  InvalidCredentials: () => {
    return { message: MSG_INVALID_CREDENTIALS}
  }
}