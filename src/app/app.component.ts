import { Component } from '@angular/core';
import {Player} from "./player";
import {PlayerEntry} from "./player-entry";
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Team} from "./team";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {
    this.selectedPlayer = {
      code: "",
      name: "",
      teamId: ""
    };
    this.entry = [
      {player: new Player, action: "action"}
    ];

    http.get('assets/players.json')
      .map(res => res.json())
      .subscribe(data => this.states = data,
        err => console.log(err),
        () => console.log('Completed'));

    http.get('assets/teams.json')
      .map(res => res.json())
      .subscribe(data => this.foods = data,
        err => console.log(err),
        () => console.log('Completed'));
  }

  title = 'app';
  states : Player[];
  foods : Team[];
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
      name: "",
      teamId: ""
    };
  }

  public setPlayer(event, player) {
    this.selectedPlayer = player;
  }
}
