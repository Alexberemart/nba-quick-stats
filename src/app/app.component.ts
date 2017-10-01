import {Component, ViewEncapsulation, OnInit, ViewChild} from "@angular/core";
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
  states: Player[];
  localPlayers: PlayerByTeam[];
  awayPlayers: PlayerByTeam[];
  players: PlayerByTeam[];
  foods: Team[];
  selectedPlayer: PlayerByTeam;
  entry: PlayerEntry[];
  points: any[] = [];
  localSelected: boolean;
  apiURL: string;
  options;
  data;

  @ViewChild('nvd3') nvd3;

  public success(event, action) {
    this.entry.push(
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

  public setPlayer(event, player) {
    this.selectedPlayer = player;
  }

  public myFunction(event) {
    alert("alex");
  }

  public loadPlayers(event, option) {
    if (option == 1) {
      this.http.get(this.apiURL + '/playerByTeamByTeam' + '?teamID=' + event.value + '&seasonCode=2018')
        .map(res => res.json())
        .subscribe(data => this.localPlayers = data,
          err => console.log(err),
          () => console.log('Completed'));
    } else {
      this.http.get(this.apiURL + '/playerByTeamByTeam' + '?teamID=' + event.value + '&seasonCode=2018')
        .map(res => res.json())
        .subscribe(data => this.awayPlayers = data,
          err => console.log(err),
          () => console.log('Completed'));
    }
  }

  public changePlayers(event) {
    if (event.value == 1) {
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
    this.entry = [
      {player: new Player, action: "action"}
    ];

    this.http.get(this.apiURL + '/playerByTeam')
      .map(res => res.json())
      .subscribe(data => this.states = data,
        err => console.log(err),
        () => console.log('Completed'));

    this.http.get(this.apiURL + '/team')
      .map(res => res.json())
      .subscribe(data => this.foods = data,
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
        showValues: true,
        valueFormat: function (d) {
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis',
          rotateLabels: -90
        },
        yAxis: {
          axisLabel: 'Y Axis',
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
