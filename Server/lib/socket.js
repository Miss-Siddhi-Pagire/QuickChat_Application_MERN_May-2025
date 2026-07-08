let io = null;
let userSocketMap = {}; // { userId: [socketId1, socketId2] }

export const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

export const getSocketServerInstance = () => io;

export const getUserSocketMap = () => userSocketMap;

export const setUserSocket = (userId, socketId) => {
  if (!userSocketMap[userId]) {
    userSocketMap[userId] = [];
  }
  if (!userSocketMap[userId].includes(socketId)) {
    userSocketMap[userId].push(socketId);
  }
};

export const removeUserSocket = (userId, socketId) => {
  if (userSocketMap[userId]) {
    userSocketMap[userId] = userSocketMap[userId].filter((id) => id !== socketId);
    if (userSocketMap[userId].length === 0) {
      delete userSocketMap[userId];
    }
  }
};


/*
  This file manages the Socket.io server instance and keeps track of connected users.

  - `io`: Stores the Socket.io server instance so it can be accessed anywhere.
  - `userSocketMap`: An object that maps userId to their socketId, allowing us to target specific users with socket events.

  Functions:
  - setSocketServerInstance(ioInstance): Saves the Socket.io instance for global use.
  - getSocketServerInstance(): Returns the saved Socket.io instance.
  - getUserSocketMap(): Returns the user-to-socket map.
  - setUserSocket(userId, socketId): Adds or updates a user's socketId in the map when they connect.
  - removeUserSocket(userId): Removes a user from the map when they disconnect.

  This setup is useful for managing private messaging, online status, or sending events to specific users.
*/

