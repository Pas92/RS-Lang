import { Component, OnInit } from '@angular/core';
import { DonutInput } from 'src/app/components/donut-chart/donut-chart.component';

export interface GameStatistic {
  newWords: number
  correctAnswers: number
  wrongAnswers: number
  bestSeries: number
}

export interface DailyStatistic {
  date: string
  audioChallenge: GameStatistic
  sprint: GameStatistic
  newWordsTotal: number
  learnedWordsTotal: number
  correctAnswersTotal: number
  wrongAnswersTotal: number
}

@Component({
  selector: 'app-short-term',
  templateUrl: './short-term.component.html',
  styleUrls: ['./short-term.component.scss']
})
export class ShortTermComponent implements OnInit {
  statistics: DailyStatistic
  audioChallenge: GameStatistic
  sprint: GameStatistic


  donutData: DonutInput

  constructor() { }

  ngOnInit(): void {
    this.audioChallenge = this.statistics.audioChallenge;
    this.sprint = this.statistics.sprint;
    this.donutData = {
      correct: this.statistics.correctAnswersTotal,
      incorrect: this.statistics.wrongAnswersTotal,
      // correct: 5,
      // incorrect: 5,
    };
  }

  getProcent(game: GameStatistic): number {
    const totalAnswer = game.correctAnswers + game.wrongAnswers;
    return Math.round(game.correctAnswers / totalAnswer * 100);
  }

}
