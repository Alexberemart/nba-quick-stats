import {Component, ViewEncapsulation, OnInit, ViewChild, Output, EventEmitter} from "@angular/core";
import {Player} from "./player";
import {PlayerEntry} from "./player-entry";
import {Http} from "@angular/http";
import "rxjs/Rx";
import {Team} from "./team";
import {environment} from "../environments/environment";
import {PlayerByTeam} from "./playerByTeam";

declare let d3: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
    '../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private http: Http) {
  }

  title = 'app';
  localPlayers: PlayerByTeam[];
  awayPlayers: PlayerByTeam[];
  players: PlayerByTeam[];
  teams: Team[];
  selectedPlayer: PlayerByTeam;
  playerEntry: PlayerEntry[];
  points: any[] = [];
  localSelected: boolean;
  apiURL: string;
  options;
  data;

  @ViewChild('nvd3') nvd3;

  public onSetAction(action) {
    this.playerEntry.push(
      {
        player: this.selectedPlayer.player,
        action: action
      }
    );

    let result = this.points.filter(point => point.player == this.selectedPlayer.player);
    if (result.length == 0) {
      this.points.push(
        {
          player: this.selectedPlayer.player,
          label: this.selectedPlayer.player.name,
          value: action
        }
      )
    }
    else {
      result[0].value += action;
    }

    this.nvd3.chart.update();

    this.selectedPlayer = new PlayerByTeam;
  }

  public onSetPlayer(player) {
    console.log("pasooo");
    this.selectedPlayer = player;
  }

  public onLoadPlayers(data) {
    if (data.option == 1) {
      this.http.get(this.apiURL + '/playerByTeamByTeam' + '?teamID=' + data.value + '&seasonCode=2018')
        .map(res => res.json())
        .subscribe(data => this.localPlayers = data,
          err => console.log(err),
          () => console.log('Completed'));
    } else {
      this.http.get(this.apiURL + '/playerByTeamByTeam' + '?teamID=' + data.value + '&seasonCode=2018')
        .map(res => res.json())
        .subscribe(data => this.awayPlayers = data,
          err => console.log(err),
          () => console.log('Completed'));
    }
  }

  public onChangeTeam(value:number) {
    if (value == 1) {
      this.localSelected = true;
      this.players = this.localPlayers;
    } else {
      this.localSelected = false;
      this.players = this.awayPlayers;
    }
  }

  ngOnInit() {
    this.apiURL = environment.apiURL;
    this.selectedPlayer = new PlayerByTeam;
    this.playerEntry = [
      {player: new Player, action: "action"}
    ];

    this.http.get(this.apiURL + '/team')
      .map(res => res.json())
      .subscribe(data => this.teams = data,
        err => console.log(err),
        () => console.log('Completed'));
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 150,
          left: 55
        },
        x: function (d) {
          return d.label;
        },
        y: function (d) {
          return d.value;
        },
        duration: 500,
        xAxis: {
          axisLabel: 'Players',
          rotateLabels: -90
        },
        yAxis: {
          axisLabel: 'Points',
          axisLabelDistance: -10
        }
      }
    };
    this.data = [
      {
        key: "Cumulative Return",
        values: this.points
      }
    ];

  }
}
