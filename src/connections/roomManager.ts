import { Socket, type Namespace } from "socket.io";
import type {
  IRoomData,
  IRoundData,
  IUrMapData,
  IUserInfo,
} from "../interface";
import { gameInstance } from "../..";

export class RoomManager {
  io: Namespace;
  sidArr: string[] = [];
  roomIdArr: string[] = [];
  rooms: Map<string, IRoomData> = new Map(); // roomId -> room data
  userRoomMap: Map<string, string> = new Map(); // uid -> roomId (for quick lookup)

  constructor(serverSocket: Namespace) {
    this.io = serverSocket;

    this.io.on("connection", this.onConnect.bind(this));
  }

  // Helper method to create a new room
  private createRoom(roomId: string): void {
    const rdUsersMap: Map<string, IUserInfo> = new Map();

    const rdCurrentRoundMap: IRoundData = {
      roundNumber: 0,
      bets: new Map(),
      winningPosition: gameInstance.position || 0, // Default fallback
    };

    const roomData: IRoomData = {
      users: rdUsersMap,
      rounds: [rdCurrentRoundMap],
      currentRound: rdCurrentRoundMap,
      gameState: gameInstance.currentMatch?.gmst || 0, // Default fallback
    };

    this.rooms.set(roomId, roomData);
    console.log(`Room ${roomId} created.`);
  }

  onConnect(clientSocket: Socket) {
    const { userId } = clientSocket.handshake.query;

    if (!userId) {
      clientSocket.emit("400", "userId not sent");
      return;
    }

    clientSocket.data["userId"] = userId;

    console.log(clientSocket.id, " clientSocket connected.");
    this.sidArr.push(clientSocket.id);

    clientSocket.on("join_room", this.joinRoom.bind(this, clientSocket));
    clientSocket.on("bet", this.onBet.bind(this, clientSocket));

    clientSocket.on("disconnect", this.onDisconnect.bind(this, clientSocket));
  }

  async joinRoom(
    clientSocket: Socket,
    { roomId }: { roomId: string }
  ): Promise<void> {
    // add roomId to room list if not already present
    if (!this.roomIdArr.includes(roomId)) this.roomIdArr.push(roomId);

    // map user to room for quick access
    this.userRoomMap.set(clientSocket.data.userId, roomId);

    // check if the room exists, if not, initialize it bu calling createRoom func
    if (!this.rooms.has(roomId)) this.createRoom(roomId);

    const room = this.rooms.get(roomId);
    if (!room) {
      console.error(`Room ${roomId} initialization failed.`);
      return;
    }

    // add user to the room's user map
    if (!room.users.has(clientSocket.data.userId)) {
      room.users.set(clientSocket.data.userId, {
        sid: clientSocket.id,
        is_connected: true,
        betAmt: 0,
      });
    } else {
      // get user data and update it with new sid & is_connected =true
      const userData = room.users.get(clientSocket.data.userId);
      if (userData) {
        userData.sid = clientSocket.id;
        userData.is_connected = true;
        room.users.set(clientSocket.data.userId, userData);
      }
    }

    console.log("this.rooms", this.rooms);
    console.log("this.userRoomMap", this.userRoomMap);

    // emit to all clients about successful room join of new socket
    this.io.emit("joined_room", {
      sid: clientSocket.id,
      roomId,
    });
  }

  async onBet(clientSocket: Socket, { betAmt }: { betAmt: number }) {}

  async onDisconnect(clientSocket: Socket) {
    console.log("socket disconnected with sid", clientSocket.id);

    this.sidArr = this.sidArr.filter((sid) => sid !== clientSocket.id);

    // user deleted from roomDetails map
    const roomId = this.userRoomMap.get(clientSocket.data.userId);
    let user = roomId
      ? this.rooms.get(roomId)?.users.get(clientSocket.data.userId)
      : null;

    if (roomId && user) {
      if (user?.is_connected) user.is_connected = false;
      this.rooms.get(roomId)?.users.set(clientSocket.data.userId, user);
    }

    // user deleted form userRoomMap
    this.userRoomMap.delete(clientSocket.data.userId);

    console.log("deleted", this.sidArr);
    console.log("deleted", this.userRoomMap);
    console.log("deleted", this.rooms);
  }
}
