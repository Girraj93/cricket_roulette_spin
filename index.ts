import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { CricketSpinRoulette } from "./src/connections/game";
import { RoomManager } from "./src/connections/roomManager";

export const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: "*" } });

export const namespace = io.of("/cric_rult_spn");

export const roomManager = new RoomManager(namespace);
export const gameInstance = new CricketSpinRoulette(roomManager);

httpServer.listen(process.env.PORT, () => {
  console.log("server running on port:", process.env.PORT);
});
