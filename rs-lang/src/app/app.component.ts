import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil} from 'rxjs';
import { StatisticHandlerService } from './services/data-handlers/statistic-handler.service';
import { AuthService } from './services/requests/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rs-lang';

  constructor(private authService: AuthService, private statHandler: StatisticHandlerService) { }

  private _isSignIn: boolean = false
  private destroy$: Subject<boolean> = new Subject<boolean>()

  ngOnInit(): void {
    this.authService.isSignIn$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this._isSignIn = value

      if (this._isSignIn) {
        this.statHandler.setAppStatistic()
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
