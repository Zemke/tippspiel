import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from './user';
import {Observable} from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {API_ENDPOINT} from './api-endpoint';

@Injectable()
export class UserService {
  constructor(private http:Http, private authHttp:AuthHttp) {
  }

  // private userWebServiceUrl = 'app/users.json'; // URL to JSON file
  private userWebServiceUrl = API_ENDPOINT + 'api/users';  // URL to web api

  getUsers():Observable<User[]> {
    return this.http.get(this.userWebServiceUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  addUser(first_name:string, last_name:string, email:string, password:string):Observable<User> {
    let body = JSON.stringify({first_name, last_name, email, password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.userWebServiceUrl, body, options)
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
    try {
      var errMsg = JSON.parse(error._body).trans;
    } catch (e) {
      let errMsg = error.message || 'Server error';
    }
    return Observable.throw(errMsg);
  }

  login(email:string, password:string) {
    let body = JSON.stringify({email, password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.userWebServiceUrl + '/login', body, options)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getUserByToken() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.authHttp.get(this.userWebServiceUrl + '/getByToken', options)
        .map(this.extractData)
        .catch(this.handleError);
  }
}
