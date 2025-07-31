// socket.ts hoặc socket.js
import { io } from "socket.io-client";
import env from "./environment";

const socket = io(env.API_URL, {
  transports: ["polling", "websocket"],
  path: "/socket.io",
});

export default socket;
