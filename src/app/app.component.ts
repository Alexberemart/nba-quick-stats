import {Component} from "@angular/core";
import {Player} from "./player";
import {PlayerEntry} from "./player-entry";
import {Http} from "@angular/http";
import "rxjs/Rx";
import {Team} from "./team";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {

    this.apiURL = environment.apiURL;

    this.selectedPlayer = {
      code: "",
      name: "",
      teamId: ""
    };
    this.entry = [
      {player: new Player, action: "action"}
    ];

    http.get(this.apiURL + '/playerByTeam')
      .map(res => res.json())
      .subscribe(data => this.states = data,
        err => console.log(err),
        () => console.log('Completed'));

    debugger;
    http.get(this.apiURL + '/team')
      .map(res => res.json())
      .subscribe(data => this.foods = data,
        err => console.log(err),
        () => console.log('Completed'));
  }

  title = 'app';
  states: Player[];
  localPlayers: Player[];
  awayPlayers: Player[];
  foods: Team[];
  selectedPlayer: Player;
  entry: PlayerEntry[];
  apiURL: string;

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

  public loadPlayers(event, option) {
    if (option == 1) {
      this.http.get(this.apiURL + '/playerByTeamByTeam' + '?teamID=' + event.value)
        .map(res => res.json())
        .subscribe(data => this.localPlayers = data,
          err => console.log(err),
          () => console.log('Completed'));
    }else{
      this.http.get(this.apiURL + '/playerByTeamByTeam' + '?teamID=' + event.value)
        .map(res => res.json())
        .subscribe(data => this.awayPlayers = data,
          err => console.log(err),
          () => console.log('Completed'));
    }
  }
}
