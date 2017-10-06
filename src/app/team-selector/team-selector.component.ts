import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Team} from "../team";

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.css']
})
export class TeamSelectorComponent implements OnInit {

  @Input() teams: Team[];
  @Output() onLoadPlayers = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  loadPlayers($event, value: number) {
    this.onLoadPlayers.emit({
      option: value,
      value: $event.value
    });
  }

}
