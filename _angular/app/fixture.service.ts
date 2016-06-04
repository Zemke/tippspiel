import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Fixture } from './Fixture';
import {Observable} from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';

@Injectable()
export class FixtureService {
  constructor(private http:Http, private authHttp:AuthHttp) {
  }

  // private fixturesWebServiceUrl = 'app/fixtures.json'; // URL to JSON file
  private fixturesWebServiceUrl = 'http://localhost:8080/api/fixtures'; // URL to JSON file

  getFixtures():Observable<Fixture[]> {
    return this.authHttp.get(this.fixturesWebServiceUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }


  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();

    if (body.fixtures) {
      body.fixtures.map((fixture:any) => {
        var splitSelfLink = fixture._links.self.href.split('/');
        fixture.id = splitSelfLink[splitSelfLink.length - 1];
        fixture.date = new Date(fixture.date);
        delete fixture._links;
        return fixture;
      })
    }

    return body.fixtures || {};
  }

  private handleError(error:any) {
    let errMsg = error.trans || 'soe.rest.err.generalError';
    return Observable.throw(errMsg);
  }

  /**
   * @see http://api.football-data.org/images/blog/state_diagram_fixture.png Fixture statuses flow
   * @param fixture
   * @returns {boolean}
   */
  inFuture(fixture:Fixture) {
    return fixture.status === 'SCHEDULED' || fixture.status === 'TIMED' || fixture.status === 'POSTPONED';
  }
}
