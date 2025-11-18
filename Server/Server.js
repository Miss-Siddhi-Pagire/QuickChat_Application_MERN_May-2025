import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/UserRoutes.js";
import messageRouter from "./routes/MessageRoutes.js";
import { Server } from "socket.io";
import {
  setSocketServerInstance,
  setUserSocket,
  removeUserSocket,
  getUserSocketMap,
} from "./lib/socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

setSocketServerInstance(io);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected:", userId);

  if (userId) {
    setUserSocket(userId, socket.id);
    socket.userId = userId;
  }

  io.emit("getOnlineUsers", Object.keys(getUserSocketMap()));

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.userId);
    removeUserSocket(socket.userId, socket.id);
    io.emit("getOnlineUsers", Object.keys(getUserSocketMap()));
  });
});

app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

if(process.env.NODE_ENV!=="production"){
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`✅ Server running on PORT ${PORT}`));
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
};
};

startServer();
//export server for vercel
export default server;