import { Component, Input, OnInit } from '@angular/core';
import { DonutInput } from 'src/app/components/donut-chart/donut-chart.component';
import { GameResult } from 'src/app/models/requests.model';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {
  showDonut: boolean = true
  showTable: boolean = false

  donutData: DonutInput

  @Input()
  results: GameResult[]

  ngOnInit() {
    console.log(this.results);
    this.getDonutData();
  }

  allCorrect(): boolean {
    return this.results.length === this.results.filter((item)=> item.correct === true).length
  }

  allInCorrect(): boolean {
    return this.results.length === this.results.filter((item)=> item.correct === false).length
  }

  showStatictics(): void {
    this.showDonut = true;
    this.showTable = false;
  }

  showTableResults(): void {
    this.showDonut = false;
    this.showTable = true;
  }

  getDonutData(): void {
    let correct = this.results.filter(el => el.correct === true).length;
    let incorrect = this.results.filter(el => el.correct === false).length;

    this.donutData = {
      correct: correct,
      incorrect: incorrect
    }
  }
}
