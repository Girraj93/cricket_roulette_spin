import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import { CricketSpinRoulette } from "./connections/game";
import { RoomManager } from "./connections/roomManager";

export const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: "*" } });

export const namespace = io.of("/cric_rult_spn");

export const gameInstance = new CricketSpinRoulette();
export const roomManager = new RoomManager(namespace);

console.log(roomManager);

httpServer.listen(process.env.PORT, () => {
  console.log("server running on port:", process.env.PORT);
});
