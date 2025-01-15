import type { IGameObject } from "../interface";

export class CricketSpinRoulette {
  position?: number;
  roomDetails: any;
  playerDetails?: string[];
  matchHistory?: { gmst: number }[];
  createdTimestamp: Date = new Date();
  updatedTimestamp: Date = new Date();
  currentMatch: {
    gmst: number;
  };
  teams = {
    1: "lsg",
    2: "lsg",
    3: "lsg",
    4: "srh",
    5: "srh",
    6: "srh",
    7: "mi",
    8: "mi",
    9: "mi",
    10: "pbk",
    11: "pbk",
    12: "pbk",
    13: "dc",
    14: "dc",
    15: "dc",
    16: "gt",
    17: "gt",
    18: "gt",
    19: "kkr",
    20: "kkr",
    21: "kkr",
    22: "csk",
    23: "csk",
    24: "csk",
  };

  constructor() {
    this.currentMatch = { gmst: 0 };
    setTimeout(() => {
      this.startMatch();
    }, 1000);
  }

  startMatch() {
    this.currentMatch.gmst = 1;
    console.log("new match start");
    setTimeout(() => {
      this.bettingPhase();
    }, 1000);
  }

  bettingPhase() {
    this.currentMatch.gmst = 2;
    console.log("bettingPhase");

    setTimeout(() => {
      this.betSettlement();
    }, 1000);
  }

  betSettlement() {
    this.currentMatch.gmst = 3;
    console.log("betSettlement");

    setTimeout(() => {
      this.gamePlayStarts();
    }, 1000);
  }

  gamePlayStarts() {
    this.currentMatch.gmst = 4;
    this.position = Math.floor(Math.random() * 23 + 1);
    console.log("gamePlayStarts");

    setTimeout(() => {
      console.log(this.position);
      this.gamePlayEnds();
    }, 1000);
  }

  gamePlayEnds() {
    this.currentMatch.gmst = 5;
    console.log("gamePlayEnds");

    setTimeout(() => {
      this.resultDeclaration();
    }, 1000);
  }

  resultDeclaration() {
    this.currentMatch.gmst = 6;
    console.log("resultDeclaration");

    setTimeout(() => {
      this.resultSettlement();
    }, 1000);
  }

  resultSettlement() {
    console.log("resultSettlement");
    this.currentMatch.gmst = 7;
    setTimeout(() => {
      this.startMatch();
    }, 1000);
  }

  makeResponse(): IGameObject {
    return {
      rmDl: this.roomDetails,
      curMh: this.currentMatch,
      apc: this.playerDetails?.length || 0,
      mhHy: this.matchHistory || [],
      cTs: new Date(),
      crTs: this.createdTimestamp,
      uTs: this.updatedTimestamp,
    };
  }
}
