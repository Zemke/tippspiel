import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Fixture } from './Fixture';
import {Observable} from 'rxjs/Observable';
import {FixtureBet} from './fixture-bet';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';

@Injectable()
export class FixtureBetService {
  constructor(private http:Http, private authHttp:AuthHttp) {
  }

  private fixturesWebServiceUrl = 'http://localhost:8080/api/bets'; // URL to JSON file

  getFixtureBet():Observable<Fixture[]> {
    return this.http.get(this.fixturesWebServiceUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  addFixtureBet(home_goals:number, away_goals:number, fixture_id:number, id?:number):Observable<any> {
    let body = JSON.stringify({home_goals, away_goals, fixture_id, id});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.authHttp.post(this.fixturesWebServiceUrl, body, options)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || {};
  }

  private handleError(error:any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
