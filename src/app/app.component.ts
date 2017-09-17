import { Component } from '@angular/core';
import {Player} from "./player";
import {PlayerEntry} from "./player-entry";
import {Http} from "@angular/http";
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {
    this.selectedPlayer = {
      code: "",
      name: ""
    };
    this.entry = [
      {player: new Player, action: "action"}
    ];

    http.get('assets/players.json')
      .map(res => res.json())
      .subscribe(data => this.states = data,
        err => console.log(err),
        () => console.log('Completed'));
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
