import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {API_ENDPOINT} from './api-endpoint';

@Injectable()
export class StandingService {
  constructor(private http:Http) {
  }

  // private standingsWebServiceUrl = 'app/standings.json'; // URL to JSON file
  private standingsWebServiceUrl = API_ENDPOINT + 'api/standings'; // URL to JSON file

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

    body.sort((s1:any, s2:any) => {
      var points1 = Number(s1.points);
      var points2 = Number(s2.points);
      var point5Valuation1 = Number(s1.p5);
      var point5Valuation2 = Number(s2.p5);

      if (points1 === points2) {
        if (point5Valuation1 === point5Valuation2) {
          return 0;
        } else if (point5Valuation1 > point5Valuation2) {
          return -1;
        } else {
          return 1;
        }
      } else if (points1 > points2) {
        return -1;
      } else {
        return 1
      }
    });

    return body || {};
  }

  private handleError(error:any) {
    let errMsg = error.trans || 'soe.rest.err.generalError';
    return Observable.throw(errMsg);
  }
}
