import { Socket, type Namespace } from "socket.io";

export class RoomManager {
  io: Namespace;
  sidArr: string[] = [];
  roomIdArr: string[] = [];

  roomsMap: { rmId: string; uid: string; sid: string } = {
    rmId: "",
    uid: "",
    sid: "",
  };

  constructor(serverSocket: Namespace) {
    this.io = serverSocket;
    this.io.on("connection", this.onConnect.bind(this));
  }

  onConnect(clientSocket: Socket) {
    console.log(clientSocket.id, " clientSocket connected.");
    this.sidArr.push(clientSocket.id);

    clientSocket.on("join_room", this.joinRoom.bind(this, clientSocket));
  }

  async joinRoom(clientSocket: Socket, roomId: string): Promise<void> {
    this.roomsMap.rmId = roomId;
    this.roomsMap.sid = clientSocket.id;
    this.roomsMap.uid = clientSocket.data.info.urId;
  }
}
