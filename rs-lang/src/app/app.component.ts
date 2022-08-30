import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StatisticHandlerService } from './services/data-handlers/statistic-handler.service';
import { AuthService } from './services/requests/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'rs-lang';

  constructor(private authService: AuthService, private statHandler: StatisticHandlerService) { }

  private _isSignIn: boolean = false
  ngOnInit(): void {
    this.authService.isSignIn$.subscribe(value => {
      this._isSignIn = value
      console.log(this._isSignIn)


      if (this._isSignIn) {
        this.statHandler.setAppStatistic()
      }
    })
  }

  ngAfterViewInit(): void {


  }
}
