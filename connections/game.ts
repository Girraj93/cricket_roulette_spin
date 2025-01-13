export class CricketSpinRoulette {
  position?: number;
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
    this.startMatch();
  }

  startMatch() {
    setTimeout(() => {
      console.log("new match start");
      this.bettingPhase();
    }, 1000);
  }
  bettingPhase() {
    setTimeout(() => {
      console.log("bettingPhase");
      this.betSettlement();
    }, 1000);
  }
  betSettlement() {
    setTimeout(() => {
      console.log("betSettlement");
      this.gamePlayStarts();
    }, 1000);
  }
  gamePlayStarts() {
    setTimeout(() => {
      console.log("gamePlayStarts");
      this.position = Math.floor(Math.random() * 23 + 1);
      console.log(this.position);
      this.gamePlayEnds();
    }, 1000);
  }
  gamePlayEnds() {
    setTimeout(() => {
      console.log("gamePlayEnds");
      this.resultDeclaration();
    }, 1000);
  }
  resultDeclaration() {
    setTimeout(() => {
      console.log("resultDeclaration");
      this.resultSettlement();
    }, 1000);
  }
  resultSettlement() {
    console.log("resultSettlement");
    this.startMatch();
  }
}
