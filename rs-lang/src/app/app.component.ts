import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/requests/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rs-lang';

  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.singOut()
  }

  private _isSignIn: boolean = false
  private _userName: string = ''

  ngOnInit(): void {
    this._isSignIn = this.authService.isSignIn
    this._userName = localStorage.getItem('userName') || ''
  }

  get isSignIn() {
    return this._isSignIn
  }

  get userName() {
    return this._userName
  }
}
