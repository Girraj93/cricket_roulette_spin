export interface IGameObject {
  rmDl: any[];
  curMh: {};
  apc: number;
  mhHy: any[];
  cTs: Date;
  crTs: Date;
  uTs: Date;
}

export interface IRoomData {
  users: Map<string, IUserInfo>; // uid -> user info
  rounds: IRoundData[]; // List of rounds in this room
  currentRound: IRoundData | null; // Active round
  gameState: number; // Game phase (1 to 7)
}

export interface IUserInfo {
  sid: string; // Socket ID
  is_connected: boolean;
  betAmt?: number; // Bet for the current round
}

export interface IUrMapData {
  rmId: string;
  sid: string;
}

export interface IRoundData {
  roundNumber: number;
  bets: Map<string, number>; // uid -> bet amount
  winningPosition?: number; // Result of the round
}
