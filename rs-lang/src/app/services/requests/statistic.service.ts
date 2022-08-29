import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, DEFAULT_USER_FULL_STATISTIC, SendingUserFullStatistics, SendingUserStatisticsObject, UserStatisticsObject } from 'src/app/models/requests.model';

import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<SendingUserStatisticsObject | UserStatisticsObject | number> {
    const userID = localStorage.getItem('userId')
    const endpoint = `users/${userID}/statistics`

    return this.http.get<SendingUserStatisticsObject | UserStatisticsObject | number>(`${BASE_URL}/${endpoint}`).pipe(
      map(e => {
        if(typeof e !== 'number') {
          delete e._id
          return e
        } else {
          return e
        }
      }),
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

    const sendingObject: SendingUserStatisticsObject = JSON.parse(JSON.stringify(statistic))
    sendingObject.optional.todayStatistics = JSON.stringify(statistic.optional!.todayStatistics)
    sendingObject.optional.fullStatistics = JSON.stringify(statistic.optional!.fullStatistics)

    return this.http.put<number>(`${BASE_URL}/${endpoint}`, sendingObject).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err)
        return of(err.status)
      })
    )
  }
}
