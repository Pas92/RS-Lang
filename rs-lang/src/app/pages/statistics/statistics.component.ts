import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { StatisticHandlerService } from 'src/app/services/data-handlers/statistic-handler.service';
import { StatisticService } from 'src/app/services/requests/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private statistics: StatisticHandlerService) {
  }

  ngOnInit(): void {
    this.statistics.appStatistic$.subscribe(data => {
      console.log(data)
    })
  }
}
