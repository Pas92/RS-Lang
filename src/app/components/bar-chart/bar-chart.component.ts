import { Component, Input, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';
import { DailyStatistic } from 'src/app/models/requests.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

@Input()fullStatisticArray: DailyStatistic[]

dayResult: Array<string> = [];

dataResult: Array<string> = [];

  public chart: any;

  constructor() {}

  ngOnInit() {
    this.getDataForChart()
    this.createChart()

  }


  getDataForChart() {
    let data = [...this.fullStatisticArray]
    data.map(item => this.dayResult.push(item.date))
    data.map(item => this.dataResult.push(`${item.newWordsTotal}`))
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {

        labels: this.dayResult,
        datasets: [
          {
            label: 'New words',
            data: this.dataResult,
            backgroundColor: 'rgb(63, 81, 181)',

          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          tooltip: {
            enabled: true,
          },
          title: {
            display: true,
            text: 'Количество новых слов за каждый день'
          }
        }

      },

    });
  }
}
