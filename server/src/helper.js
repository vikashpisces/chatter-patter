let roomUsers = [];
const formatMessage = function (userName, message) {
  return {
    userName,
    message,
    time: new Date().toLocaleTimeString()
  }
}

const addUser = (id, userName, room) => {
  const user = { id, userName, room };
  roomUsers.push(user);
}

const removeUser = (socketId) => {
  const index = roomUsers.findIndex(user => user.id == socketId);
  if (index !== -1) {
    return roomUsers.splice(index, 1)[0];
  }
}

const getActiveUserInfo = function (socketId) {
  return roomUsers.find(user => user.id === socketId);
}

const getCurrentRoomUsers = (room) => {
  return roomUsers.filter(user => user.room === room)
}

module.exports = {
  formatMessage,
  getActiveUserInfo,
  addUser,
  removeUser,
  getCurrentRoomUsers
}