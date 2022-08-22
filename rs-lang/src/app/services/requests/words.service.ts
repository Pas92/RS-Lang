import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { WordData, BASE_URL, ENDPOINTS, AuthWordDataResponse } from 'src/app/models/requests.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getData(group: number, page: number): Observable<WordData[]>{
    let params: HttpParams


    let endpoint: string = ''

    if(this.authService.isSignIn) {
      params = new HttpParams()
        .set('wordsPerPage', 20)
        .set('filter', `{"$and":[{"page":${page}, "group":${group}}]}`)

      const userID = localStorage.getItem('userId')
      endpoint = `users/${userID}/aggregatedWords`
      } else {
        params = new HttpParams()
          .set('group', `${group}`)
          .set('page', `${page}`)

        endpoint = ENDPOINTS.words
      }

      const options = {
        params: params
      }

    return this.http.get<WordData[]>(`${BASE_URL}/${endpoint}`, options).pipe(
      map(e => this.authService.isSignIn ? ((e[0] as unknown) as AuthWordDataResponse).paginatedResults : e)
    )
  }
}
