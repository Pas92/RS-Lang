import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StatisticHandlerService } from 'src/app/services/data-handlers/statistic-handler.service';
import { AuthService } from 'src/app/services/requests/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService, private statHandler: StatisticHandlerService) { }

  private _isSignIn: boolean = false

  ngOnInit(): void {
    this.authService.isSignIn$.subscribe(value => {
      this._isSignIn = value
      console.log(this._isSignIn)

    })
  }

  ngAfterViewInit(): void {


    if (this._isSignIn) {
      this.statHandler.setAppStatistic()
    }
  }

}
