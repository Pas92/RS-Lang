import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/requests/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private statistics: StatisticService) { }

  ngOnInit(): void {
    this.statistics.getStatistics().subscribe(data => {
      console.log(data)
    })
  }

}
