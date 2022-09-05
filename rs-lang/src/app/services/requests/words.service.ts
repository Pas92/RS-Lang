import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { WordData, BASE_URL, ENDPOINTS, AuthWordDataResponse, UserWordData, DEFAULT_CUSTOM_USER_DATA, MIN_WORDS_FOR_GAME } from 'src/app/models/requests.model';
import { AuthService } from './auth.service';
import { catchError, empty, map, mergeAll, of, take, takeWhile, tap, expand, EMPTY, toArray, takeLast } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }

  getData(group: number, page: number, words: WordData[] = []): Observable<WordData[]>{
    let params: HttpParams
    let endpoint: string = ''

    if (localStorage.getItem('userToken')) {
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
      map(e => localStorage.getItem('userToken')
        ? this.getDataWithCustomUserData(((e[0] as unknown) as AuthWordDataResponse).paginatedResults)
        : e),
      map(e => words.length ? this.dropLearnedWords([...e, ...words]) : e)
    )
  }

  private getDataWithCustomUserData(arr: WordData[]): WordData[] {
    return arr.map(e => e.userWord ? e : { ...e, userWord: JSON.parse(JSON.stringify(DEFAULT_CUSTOM_USER_DATA)) })
  }

  getDifficultWordData(): Observable<WordData[]> {
    let params: HttpParams = new HttpParams()
        .set('wordsPerPage', 3600)
        .set('filter', `{"$and":[{"userWord.optional.rating": {"$lt": 3}}]}`)

    const userID = localStorage.getItem('userId')
    const endpoint: string = `users/${userID}/aggregatedWords`

    const options = {
        params: params
    }

    return this.http.get<WordData[]>(`${BASE_URL}/${endpoint}`, options).pipe(
      map(e => localStorage.getItem('userToken') ? ((e[0] as unknown) as AuthWordDataResponse).paginatedResults : e)
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

  getDataForTextbookGame(group: number, page: number): Observable<WordData[]> {
    let params: HttpParams = new HttpParams()
      .set('wordsPerPage', 600)
      .set('filter', `{"$and":[{"page":{"$lt":${page + 1}}, "group":${group}}]}`)

    const userID = localStorage.getItem('userId')
    const endpoint: string = `users/${userID}/aggregatedWords`

    const options = {
        params: params
    }

    return this.http.get<WordData[]>(`${BASE_URL}/${endpoint}`, options).pipe(
      map(e => localStorage.getItem('userToken') ? ((e[0] as unknown) as AuthWordDataResponse).paginatedResults : e),
      map(e => this.dropLearnedWords(e))
    )
  }

  getTextbookGameDataWithMinWordsCount(group: number, page: number): Observable<WordData[]> {
    let currentPage = page
    const request$ = this.getData(group, currentPage)

    return request$.pipe(
      expand((response: WordData[]) => {
        if (response.length > MIN_WORDS_FOR_GAME || currentPage < 0) {
          return EMPTY
        } else {
          --currentPage
          return this.getData(group, currentPage, response)
        }
      }),
      takeLast(1)
    )
  }

  dropLearnedWords(arr: WordData[]): WordData[] {
    return arr.filter(e => +(e.userWord?.optional?.rating || 0) < 6);
  }
}
