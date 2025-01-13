import { Socket, type Namespace } from "socket.io";

interface IUrMapData {
  rmId: string;
  sid: string;
}

export class RoomManager {
  io: Namespace;
  sidArr: string[] = [];
  roomIdArr: string[] = [];
  // uid:{rmId:string,sid:string}
  userRoomMap: Map<string, IUrMapData> = new Map();
  // rmid:{uid:sid}
  roomDetails: Map<string, Map<string, string>> = new Map();

  constructor(serverSocket: Namespace) {
    this.io = serverSocket;
    this.io.on("connection", this.onConnect.bind(this));
  }

  onConnect(clientSocket: Socket) {
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
    if (!this.roomIdArr.includes(roomId)) this.roomIdArr.push(roomId);

    // set user id with room and socket id for direct access
    this.userRoomMap.set(clientSocket.id, {
      rmId: roomId,
      sid: clientSocket.id,
    });

    //
    this.roomDetails.set(roomId, new Map());
    this.roomDetails.get(roomId)?.set(clientSocket.id, clientSocket.id);

    console.log(this.sidArr);
    console.log(this.roomIdArr);

    this.io.emit("200", {
      sid: clientSocket.id + "joined",
      roomId,
    });
  }

  async onBet(clientSocket: Socket, { betAmt }: { betAmt: number }) {}

  async onDisconnect(clientSocket: Socket) {
    console.log("socket disconnected with sid", clientSocket.id);

    this.sidArr = this.sidArr.filter((sid) => sid !== clientSocket.id);

    // user deleted from roomDetails map
    let roomId = this.userRoomMap.get(clientSocket.id)?.rmId;
    if (roomId) this.roomDetails.get(roomId)?.delete(clientSocket.id);

    // user deleted form userRoomMap
    this.userRoomMap.delete(clientSocket.id);

    console.log(this.sidArr);
    console.log(this.roomDetails);
    console.log(this.userRoomMap);
  }
}
