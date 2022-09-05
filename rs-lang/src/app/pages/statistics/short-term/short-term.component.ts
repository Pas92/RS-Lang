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
      this.audioChallenge = this.statistics.audioChallenge;
      this.sprint = this.statistics.sprint;
      this.donutData = {
      correct: this.statistics.correctAnswersTotal,
      incorrect: this.statistics.wrongAnswersTotal,
    }
  }

  getProcent(game: GameStatistic): number {
    const totalAnswer = game.correctAnswers + game.wrongAnswers;
    return Math.round(game.correctAnswers / totalAnswer * 100);
  }

}
