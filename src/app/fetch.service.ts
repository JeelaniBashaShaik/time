import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private _http: HttpClient) { }

  fetchNews(newsUrl): Observable<any> {
    return this._http.get(newsUrl);
  }

  fetchNpmData(packageUrl): Observable<any> {
    return this._http.get(packageUrl);
  }

}
