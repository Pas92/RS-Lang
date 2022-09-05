import { Component, Input, OnInit } from '@angular/core';
import { DonutInput } from 'src/app/components/donut-chart/donut-chart.component';
import { DailyStatistic, GameStatistic } from 'src/app/models/requests.model';

@Component({
  selector: 'app-short-term',
  templateUrl: './short-term.component.html',
  styleUrls: ['./short-term.component.scss']
})

export class ShortTermComponent implements OnInit {
  @Input()statistics: DailyStatistic
  audioChallenge: GameStatistic
  sprint: GameStatistic

  donutData: DonutInput

  constructor() { }

  ngOnInit(): void {
    console.log(this.statistics);

      this.audioChallenge = this.statistics.audioChallenge;
      this.sprint = this.statistics.sprint;
      this.donutData = {
      correct: this.statistics.correctAnswersTotal,
      incorrect: this.statistics.wrongAnswersTotal,
    }
  }

  getProcent(game: GameStatistic): number {
    const totalAnswer = game.correctAnswers + game.wrongAnswers;
    return totalAnswer
    ? Math.round(game.correctAnswers / totalAnswer * 100)
    : 0;
  }

  getSessionText(game: GameStatistic): string {
    const session = game.bestSeries;
    if (session === 1)  {
      return `Лучшая сессия: ${session} слово подряд`;
    } else if (session === (2 || 3 || 4)) {
      return `Лучшая сессия: ${session} слова подряд`;
    } else {
      return `Лучшая сессия: ${session} слов подряд`
    }
  }
}
