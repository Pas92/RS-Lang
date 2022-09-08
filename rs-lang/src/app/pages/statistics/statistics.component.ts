import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  DailyStatistic,
  UserStatisticsObject,
} from 'src/app/models/requests.model';
import { StatisticHandlerService } from 'src/app/services/data-handlers/statistic-handler.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  showToday = true;
  noUserImage = false;
  showAll = false;

  appStatistics: Subscription;

  statisticData: UserStatisticsObject;

  todayStatistics: DailyStatistic;

  fullStatistics: DailyStatistic[];

  fullStatisticArray: DailyStatistic[];

  constructor(private statHandler: StatisticHandlerService) {}

  ngOnInit(): void {
    this.appStatistics = this.statHandler._appStatistic$.subscribe((data) => {
      if(data) {
        this.statisticData = data;
        this.todayStatistics = this.statisticData.optional!.todayStatistics;
        this.fullStatistics = this.statisticData.optional!.fullStatistics;
        this.fullStatisticArray = [...this.fullStatistics, this.todayStatistics];
      }
    });
    this.checkAuth();
  }

  showShortTerm(): void {
    this.showToday = true;
    this.showAll = false;
  }

  showLongTerm(): void {
    this.showToday = false;
    this.showAll = true;
  }

  checkAuth(): void {
    if (!localStorage.getItem('userToken')) {
      this.showToday = false;
      this.showAll = false;
      this.noUserImage = true;
    }
  }

  ngOnDestroy(): void {
    this.appStatistics.unsubscribe();
    this.noUserImage = false;
  }
}
