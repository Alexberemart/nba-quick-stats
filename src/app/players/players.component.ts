import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {PlayerByTeam} from "../playerByTeam";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  @Input() players: PlayerByTeam[];
  @Output() onSetPlayer = new EventEmitter<PlayerByTeam>();

  constructor() {
  }

  ngOnInit() {
  }

  onChangeTeam(players: PlayerByTeam[]) {
    console.log("llego");
  }

  setPlayer($event, player : PlayerByTeam){
    this.onSetPlayer.emit(player)
  }

}
