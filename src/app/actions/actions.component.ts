import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {PlayerByTeam} from "../playerByTeam";
import {Action} from "../action";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  @Input() player: PlayerByTeam;
  @Output() onSetAction = new EventEmitter<PlayerByTeam>();
  actions: Action[] = [];

  constructor() {
  }

  ngOnInit() {
    this.actions.push({
      id:"10",
      value: 3,
      description: "3PTS",
      style: "primary"
    });
    this.actions.push({
      id:"20",
      value: 2,
      description: "2PTS",
      style: "accent"
    });
    this.actions.push({
      id:"30",
      value: 1,
      description: "1PTS",
      style: "warn"
    })
  }

  setAction($event, action) {
    this.onSetAction.emit(action);
  }

}
