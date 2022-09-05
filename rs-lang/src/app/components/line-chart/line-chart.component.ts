import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DailyStatistic } from 'src/app/models/requests.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  public chart: any;

  @Input()fullStatisticArray: DailyStatistic[]

  dayResult: Array<string> = [];

dataResult: Array<string> = [];
totalWords = 0;


  private lineChartOptions:any = {
    legend : {
        labels : {
          fontColor : '#ffffff'
        }
    }
};

  constructor() {}

  ngOnInit() {
    this.createChart();
    this.getDataForChart()
  }


  getDataForChart() {
    let data = [...this.fullStatisticArray]
    data.map(item => this.dayResult.push(item.date))

    data.forEach(item => {
      this.totalWords+= +item.newWordsTotal;
      this.dataResult.push(`${this.totalWords}`)
    })
  }

  createChart() {
    this.chart = new Chart('MyLineChart', {
      type: 'line',

      data: {
        labels: this.dayResult,
        datasets: [
          {
            label: 'New words',
            data: this.dataResult,
            backgroundColor: 'rgb(63, 81, 181)',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 8,
            borderColor: 'rgb(255, 64, 129)',



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
            text: 'Oбщеe количествo изученных слов по дням',
          },
        },
      },
    });
  }
}
