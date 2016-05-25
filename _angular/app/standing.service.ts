import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StandingService {
  constructor(private http:Http) {
  }

  // private standingsWebServiceUrl = 'app/standings.json'; // URL to JSON file
  private standingsWebServiceUrl = 'http://localhost:8080/api/standings'; // URL to JSON file

  getStandings():Observable<any[]> {
    return this.http.get(this.standingsWebServiceUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }


  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();

    if (body.standings) {
      body.standings.map((standing:any) => {
        return standing;
      })
    }

    return body.standings || {};
  }

  private handleError(error:any) {
    let errMsg = error.trans || 'soe.rest.err.generalError';
    return Observable.throw(errMsg);
  }
}
