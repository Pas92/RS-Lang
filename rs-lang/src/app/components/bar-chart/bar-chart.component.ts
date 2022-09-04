import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  public chart: any;

  constructor() {}

  ngOnInit() {
    this.createChart()
  }
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', 

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
        ],
        datasets: [
          {
            label: 'New words',
            data: ['4', '7', '5', '7', '9', '5', '3', '6'],
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
