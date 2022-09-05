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
        console.log();
      }


    });
  }

  showShortTerm() {
    this.showToday = true;
    this.showAll = false;
  }

  showLongTerm() {
    this.showToday = false;
    this.showAll = true;
  }

  ngOnDestroy() {
    this.appStatistics.unsubscribe();
  }
}
