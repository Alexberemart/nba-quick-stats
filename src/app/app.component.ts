import { Component } from '@angular/core';
import {Player} from "./player";
import {PlayerEntry} from "./player-entry";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    this.selectedPlayer = {
      code: "",
      name: ""
    };
    this.states = [
      {code: 'AL', name: 'Andre Iguodala'},
      {code: 'kdurant', name: 'Kevin Durant'},
      {code: 'kdurant', name: 'Stephen Curry'}
    ];
    this.entry = [
      {player: this.states[1], action: "action"}
    ];
  }

  title = 'app';
  states : Player[];
  selectedPlayer : Player;
  entry : PlayerEntry[];

  public success(event, action) {
    this.entry.push(
      {
        player: this.selectedPlayer,
        action: action
      }
    );
    this.selectedPlayer = {
      code: "",
      name: ""
    };
  }

  public setPlayer(event, player) {
    this.selectedPlayer = player;
  }
}
