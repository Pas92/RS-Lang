import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { WordData, BASE_URL, ENDPOINTS, AuthWordDataResponse, UserWordData, DEFAULT_CUSTOM_USER_DATA } from 'src/app/models/requests.model';
import { AuthService } from './auth.service';
import { catchError, map, of } from 'rxjs';

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
      map(e => this.authService.isSignIn
        ? this.getDataWithCustomUserData(((e[0] as unknown) as AuthWordDataResponse).paginatedResults)
        : e)
    )
  }

  private getDataWithCustomUserData(arr: WordData[]): WordData[] {
    return arr.map(e => e.userWord ? e : {...e, userWord: DEFAULT_CUSTOM_USER_DATA})
  }

  getDifficultWordData(): Observable<WordData[]> {
    let params: HttpParams = new HttpParams()
        .set('wordsPerPage', 3600)
        .set('filter', `{"$and":[{"userWord.options.rating": ($lt: 3)}]}`)

    const userID = localStorage.getItem('userId')
    const endpoint: string = `users/${userID}/aggregatedWords`

    const options = {
        params: params
    }

    return this.http.get<WordData[]>(`${BASE_URL}/${endpoint}`, options).pipe(
      map(e => this.authService.isSignIn ? ((e[0] as unknown) as AuthWordDataResponse).paginatedResults : e)
    )
  }

  setUserDataForWord(wordID: string, customWordData: UserWordData): Observable<number> {
    const userID = localStorage.getItem('userId')
    const endpoint = `users/${userID}/words/${wordID}`

    return this.http.post<number>(`${BASE_URL}/${endpoint}`, customWordData).pipe(
        catchError((err: HttpErrorResponse) => {
          return of(err.status)
      })
    )
  }

  updateUserDataForWord(wordID: string, customWordData: UserWordData): Observable<number> {
    const userID = localStorage.getItem('userId')
    const endpoint = `users/${userID}/words/${wordID}`

    return this.http.put<number>(`${BASE_URL}/${endpoint}`, customWordData).pipe(
        catchError((err: HttpErrorResponse) => {
          if(err.status === 404) {
            return this.setUserDataForWord(wordID, customWordData)
          }
          return of(err.status)
      })
    )
  }
}
