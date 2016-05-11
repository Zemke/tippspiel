import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Fixture } from './Fixture';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FixtureService {
  constructor(private http:Http) {
  }

  private fixturesWebServiceUrl = 'app/fixtures.json'; // URL to JSON file

  getFixtures():Observable<Fixture[]> {
    return this.http.get(this.fixturesWebServiceUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }


  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();

    if (body.fixtures) {
      body.fixtures.map(fixture => {
        delete fixture._links;
        return fixture;
      })
    }

    return body.fixtures || {};
  }

  private handleError(error:any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
