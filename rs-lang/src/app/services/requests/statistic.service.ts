import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, DEFAULT_USER_FULL_STATISTIC, UserStatisticsObject } from 'src/app/models/requests.model';

import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<UserStatisticsObject | number> {
    const userID = localStorage.getItem('userId')
    const endpoint = `users/${userID}/statistics`

    return this.http.get<UserStatisticsObject | number>(`${BASE_URL}/${endpoint}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          const defaultStatistic = {
            learnedWords: 0,
            optional: JSON.parse(JSON.stringify(DEFAULT_USER_FULL_STATISTIC))
          }
          this.setStatistic(JSON.parse(JSON.stringify(defaultStatistic))).subscribe()
          return of(defaultStatistic)
        }
        return of(err.status)
      })
    )
  }

  setStatistic(statistic: UserStatisticsObject): Observable<number> {
    const userID = localStorage.getItem('userId')
    const endpoint = `users/${userID}/statistics`

    return this.http.put<number>(`${BASE_URL}/${endpoint}`, statistic).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err)
        return of(err.status)
      })
    )
  }
}
