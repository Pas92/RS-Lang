import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DailyStatistic, DEFAULT_DAILY_STATISTIC, UserStatisticsObject } from 'src/app/models/requests.model';
import { AuthService } from '../requests/auth.service';
import { StatisticService } from '../requests/statistic.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticHandlerService {

  constructor(private statisticProvider: StatisticService, private authService: AuthService) {
    this.authService.isSignIn$.subscribe(data => {
      this._isSignIn = data
    })
    if (this._isSignIn) {
      this.setAppStatistic()
    }
  }

  private _isSignIn: boolean = false

  private _appStatistic!: UserStatisticsObject

  get appStatistic$(): Observable<UserStatisticsObject> {
    return this._appStatistic$
  }

  private _appStatisticSubj: BehaviorSubject<UserStatisticsObject> = new BehaviorSubject(this._appStatistic)
  private _appStatistic$: Observable<UserStatisticsObject> = this._appStatisticSubj.asObservable();

  setAppStatistic(): void {
    this.statisticProvider.getStatistics().subscribe((data) => {
      if (typeof data !== 'number') {
        data.optional!.todayStatistics = JSON.parse((data.optional!.todayStatistics as string))
        data.optional!.fullStatistics = JSON.parse(data.optional!.fullStatistics as string)

        this._appStatistic = data as UserStatisticsObject
        this._appStatisticSubj.next(this._appStatistic)
        this.checkTodayStatistic()
      }
    })
  }

  private checkTodayStatistic(): void {
    const today: string = moment().format('DD-MM-YYYY')
    if(today !== this._appStatistic.optional?.date) {
      this._appStatistic.optional?.fullStatistics.push(this._appStatistic.optional?.todayStatistics)
      this._appStatistic.optional!.todayStatistics = JSON.parse(JSON.stringify(DEFAULT_DAILY_STATISTIC)) as DailyStatistic
      this._appStatistic.optional!.date = today
      this.statisticProvider.setStatistic(this._appStatistic).subscribe(_ => {
        this._appStatisticSubj.next(this._appStatistic)
      })
    }
  }
}
