const formatMessage = function (userName, message) {
  return {
    userName,
    message,
    time: new Date().toLocaleTimeString()
  }
}

module.exports = {
  formatMessage
}