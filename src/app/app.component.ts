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

    http.get('http://localhost:8080/playerByTeam')
      .map(res => res.json())
      .subscribe(data => this.states = data,
        err => console.log(err),
        () => console.log('Completed'));

    http.get('http://localhost:8080/team')
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

  public myFunction(event) {
    debugger;
    alert("alex");
  }

  public loadPlayers(event) {
    debugger;
    this.http.get('http://localhost:8080/playerByTeamByTeam' + '?teamID=' + event.value)
      .map(res => res.json())
      .subscribe(data => this.states = data,
        err => console.log(err),
        () => console.log('Completed'));
  }
}
