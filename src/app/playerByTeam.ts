import {Player} from "./player";
export class PlayerByTeam {
  id: string;
  player: Player
  team: {
    code: string;
    name: string;
  };
  fromDate: string;
  toDate: string;
}
