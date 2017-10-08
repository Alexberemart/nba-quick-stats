import {Injectable, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../environments/environment";
import {GeneralService} from "./general.service";

@Injectable()
export class PlayerByTeamService{

  constructor(private http: Http,
              private generalService: GeneralService) { }

  getPlayerByTeam(teamId: string){
    const path = '/playerByTeamByTeam';
    return this.http.get(this.generalService.getUrl() + path + '?teamID=' + teamId + '&seasonCode=2018')
  }

}
