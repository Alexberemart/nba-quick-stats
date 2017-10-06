import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-team-slider',
  templateUrl: './team-slider.component.html',
  styleUrls: ['./team-slider.component.css']
})
export class TeamSliderComponent implements OnInit {

  @Output() onChangeTeam = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  changeTeam($event){
    this.onChangeTeam.emit($event.value);
  }

}
