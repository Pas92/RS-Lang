import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

type Result =  'Неправильно' | 'Правильно';

export interface DonutInput {
  correct: number,
  incorrect: number
}

export interface DonutData {
  procent: string,
  answerCount: number,
  result: Result
}

@Component({
  selector: 'app-donut-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {

  @Input()donutData!: DonutInput

  wordsCount = 0;

  ANSWERS: DonutData[] = [];

  private width!: number;
  private height!: number;

  private svg: any;

  private radius!: number;

  private arc: any;
  private pie: any;
  private color: any;

  correctProcent = 0;

  ngOnInit() {
    this.getData();
    this.initSvg();
    this.drawChart(this.ANSWERS);
  }

  getData() {
    let correct = this.donutData.correct;
    let incorrect = this.donutData.incorrect;
    this.wordsCount = correct + incorrect;
    let incorrectProcent = Math.round(incorrect / (this.wordsCount / 100))
    this.correctProcent = Math.round(correct / (this.wordsCount / 100))

    let itemInCorrect: DonutData = { procent: `${incorrectProcent}`, answerCount: incorrect, result: 'Неправильно' };
    let itemCorrect: DonutData = { procent: `${this.correctProcent}`, answerCount: correct, result: 'Правильно' };
    this.ANSWERS.push(itemInCorrect);
    this.ANSWERS.push(itemCorrect);
  }

  private initSvg() {
    this.svg = d3.select('#svg');

    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.radius = Math.min(this.width, this.height) / 2;

    this.color = d3Scale.scaleOrdinal()
      .range(['#ff4081', '#3f51b5']);

    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 70);

    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.answerCount);

    this.svg = d3.select('#svg')
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private drawChart(data: any[]) {
    let g = this.svg.selectAll('.arc')
      .data(this.pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.procent))

    g.append('text')
      .attr('transform', (d: any) => 'translate(' + this.arc.centroid(d) + ')')
      .attr('dy', '.35em')
      .style('fill', 'white')
      .text((d: any) => d.data.procent);


    g.append('title')
      .attr('transform', (d: any) => 'translate(' + this.arc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.result);

    g.append('text')
      .attr('class', 'centr')
      .text(`${this.correctProcent}%`);
  }

}
