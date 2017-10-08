import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {GeneralService} from "./general.service";

@Injectable()
export class TeamService {

  constructor(private http: Http,
              private generalService: GeneralService) { }

  getTeams(){
    const teamPath = '/team';
    return this.http.get(this.generalService.getUrl() + teamPath)
  }

}
