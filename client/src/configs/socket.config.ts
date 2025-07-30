// socket.ts hoặc socket.js
import { io } from "socket.io-client";
import env from "./environment";

const socket = io(env.API_URL, {
  transports: ["polling", "websocket"], // 👈 ép dùng polling để tránh lỗi trên Render
});

export default socket;
