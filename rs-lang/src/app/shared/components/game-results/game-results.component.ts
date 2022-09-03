import { Component, Input, OnInit } from '@angular/core';
import { GameResult } from 'src/app/models/requests.model';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {
  showDonut: boolean = true
  showTable: boolean = false

  @Input()
  results: GameResult[]

  ngOnInit() {
    console.log(this.results);
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
}
