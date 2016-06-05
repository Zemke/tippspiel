import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GeneralService {
  constructor(private http:Http) {
  }

  getShieldInfo() {
    return this.http.get('https://img.shields.io/github/release/Zemke/tippspiel.json?nocache=' + new Date().valueOf())
        .map((res) => {return (res.json() || {})});
  }
}
