import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";

@Injectable()
export class GeneralService {

  private apiURL: string;

  constructor() {
    this.apiURL = environment.apiURL;
  }

  getUrl() {
    return this.apiURL;
  }

}
