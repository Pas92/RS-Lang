import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject, takeUntil} from 'rxjs';
import { DailyStatistic, DEFAULT_DAILY_STATISTIC, UserStatisticsObject } from './models/requests.model';
import { StatisticHandlerService } from './services/data-handlers/statistic-handler.service';
import { AuthService } from './services/requests/auth.service';
import { StatisticService } from './services/requests/statistic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rs-lang';

  constructor(private authService: AuthService, private statHandler: StatisticHandlerService, private statisticProvider: StatisticService) { }

  private _isSignIn: boolean = false
  private destroy$: Subject<boolean> = new Subject<boolean>()

  ngOnInit(): void {
    this.authService.isSignIn$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this._isSignIn = value

      if (this._isSignIn) {
        this.setAppStatistic()
      }
    })

    this.statHandler._appStatistic$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if(data) {
        this.statHandler._appStatistic = data
        this.statisticProvider.setStatistic(data).pipe(takeUntil(this.destroy$)).subscribe(_ => {
          this.checkTodayStatistic()
        })
      }
    })
  }

  setAppStatistic(): void {
    this.statisticProvider.getStatistics().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (typeof data !== 'number') {
        if (typeof data.optional!.todayStatistics === 'string') {
          data.optional!.todayStatistics = JSON.parse((data.optional!.todayStatistics as string))
          data.optional!.fullStatistics = JSON.parse(data.optional!.fullStatistics as string)
        }

        this.statHandler._appStatisticSubj.next(data as UserStatisticsObject)
      }
    })
  }

  private checkTodayStatistic(): void {

      const today: string = moment().format('DD-MM-YYYY')
      if (today !== this.statHandler._appStatistic.optional?.date) {
        this.statHandler._appStatistic.optional!.fullStatistics.push(this.statHandler._appStatistic.optional!.todayStatistics)
        this.statHandler._appStatistic.optional!.todayStatistics = JSON.parse(JSON.stringify(DEFAULT_DAILY_STATISTIC)) as DailyStatistic
        this.statHandler._appStatistic.optional!.date = today
        this.statHandler._appStatisticSubj.next(this.statHandler._appStatistic)
      }

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
