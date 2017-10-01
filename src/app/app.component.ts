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
    if (result.length == 0){
      this.points.push(
        {
          player: this.selectedPlayer.player,
          label: this.selectedPlayer.player.name,
          value: 1
        }
      )
    }
    else{
      result[0].value += 1;
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
      this.players = this.localPlayers;
    } else {
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
    }
    this.data = [
      {
        key: "Cumulative Return",
        values: this.points
        // values: [
        //   {
        //     "label": "Michael Jordan",
        //     "value": 29.765957771107
        //   },
        //   {
        //     "label": "B",
        //     "value": 0
        //   },
        //   {
        //     "label": "C",
        //     "value": 32.807804682612
        //   },
        //   {
        //     "label": "D",
        //     "value": 196.45946739256
        //   },
        //   {
        //     "label": "E",
        //     "value": 0.19434030906893
        //   },
        //   {
        //     "label": "F",
        //     "value": 98.079782601442
        //   },
        //   {
        //     "label": "G",
        //     "value": 13.925743130903
        //   },
        //   {
        //     "label": "H",
        //     "value": 5.1387322875705
        //   }
        // ]
      }
    ];
  }
}
