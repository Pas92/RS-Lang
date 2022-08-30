import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, BASE_URL, ENDPOINTS, UserReg, UserRegResponse, UserSingIn } from 'src/app/models/requests.model';
import { catchError, of, Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
    this._isSignIn = !!localStorage.getItem('userToken') || false
    this.isSignInSubj.next(this._isSignIn)

    this.userNameSubj.next(localStorage.getItem('userName') || '')
  }

  private _isSignIn: boolean = false

  private isSignInSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isSignIn$: Observable<boolean> = this.isSignInSubj.asObservable();

  private userNameSubj: BehaviorSubject<string> = new BehaviorSubject('false');
  private _userName$: Observable<string> = this.userNameSubj.asObservable();

  createUser(userData: UserReg): Observable<UserRegResponse | number> {
    //417 user exist
    //422 email or password error
    return this.http.post<number>(`${BASE_URL}/${ENDPOINTS.users}`, userData).pipe(
      catchError((err) => {
        return of(err.status)
      })
    )
  }

  signIn(userData: UserSingIn): Observable<AuthData | number >{
    return this.http.post<number>(`${BASE_URL}/${ENDPOINTS.signin}`, userData).pipe(
      catchError((err) => {
        return of(err.status)
      })
    )
  }

  setUserInfo(userData: AuthData): void {
    this.setLocalStorage(userData)
    this.isSignInSubj.next(true)
    this.userNameSubj.next(userData.name)
    this.router.navigate(['/'])
  }

  get isSignIn(): boolean {
    return this._isSignIn
  }

  get isSignIn$ (): Observable<boolean> {
    return this._isSignIn$
  }

  get userName$(): Observable<string> {
    return this._userName$
  }

  private setLocalStorage(settings: AuthData): void {
    localStorage.setItem('userName', settings.name)
    localStorage.setItem('userId', settings.userId)
    localStorage.setItem('userToken', settings.token)
    localStorage.setItem('userRefreshToken', settings.refreshToken)
  }

  singOut(): void {
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    localStorage.removeItem('userToken')
    localStorage.removeItem('userRefreshToken')
    this.isSignInSubj.next(false)
    this.userNameSubj.next('')

    this.router.navigate(['/'])
  }
}
