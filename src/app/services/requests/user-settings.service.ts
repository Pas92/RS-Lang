import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BASE_URL, DEFAULT_USER_FULL_SETTINGS, SendingUserSettingsObject, UserSettingsObject } from 'src/app/models/requests.model';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private http: HttpClient) { }

  getSettings(): Observable<SendingUserSettingsObject | UserSettingsObject | number> {
    const userID = localStorage.getItem('userId')
    const endpoint = `users/${userID}/settings`

    return this.http.get<SendingUserSettingsObject | UserSettingsObject | number>(`${BASE_URL}/${endpoint}`).pipe(
      map(e => {
        if (typeof e !== 'number') {
          delete e._id
          e.optional.pages = JSON.parse(e.optional.pages as string)
          return e
        } else {
          return e
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          const defaultSetting = {
            wordsPerDay: 1,
            optional: JSON.parse(JSON.stringify(DEFAULT_USER_FULL_SETTINGS))
          }
          this.setSetting(JSON.parse(JSON.stringify(defaultSetting))).subscribe()
          return of(defaultSetting)
        }
        return of(err.status)
      })
    )
  }

  setSetting(setting: UserSettingsObject): Observable<number> {
    const userID = localStorage.getItem('userId')
    const endpoint = `users/${userID}/settings`

    const sendingObject: SendingUserSettingsObject = JSON.parse(JSON.stringify(setting))
    sendingObject.optional.pages = JSON.stringify(setting.optional.pages)

    return this.http.put<number>(`${BASE_URL}/${endpoint}`, sendingObject).pipe(
      catchError((err: HttpErrorResponse) => {
        return of(err.status)
      })
    )
  }
}
