import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";

export const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: "*" } });

export const namespace = io.of("/cric_rult_spn");

namespace.on("connection", (socket: Socket) => {
  console.log("socket connected with sid:", socket.id);

  socket.on("disconnect", () => {
    console.log("socket disconnected with sid:", socket.id);
  });
});

httpServer.listen(5500, () => {
  console.log("server running on port:", 5500);
});
