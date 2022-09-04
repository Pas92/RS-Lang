import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  public chart: any;

  constructor() {}

  ngOnInit() {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart('MyLineChart', {
      type: 'line',

      data: {
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
          '2022-05-18',
          '2022-05-19',
          '2022-05-20',
          '2022-05-21',
          '2022-05-22',
          '2022-05-23',
          '2022-05-24',
          '2022-05-25',
        ],
        datasets: [
          {
            label: 'New words',
            data: ['4', '7', '10', '12', '15', '19', '21', '30', '32', '35', '38', '42', '45', '45', '45', '46'],
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
