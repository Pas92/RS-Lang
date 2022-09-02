import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameResult} from 'src/app/models/requests.model';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {
  @Input()
  gameResults: GameResult[]

  correctResults: GameResult[] = []
  incorrectResults: GameResult[] = []
  totalScore: number

  ngOnInit(): void {
    this.gameResults.forEach((item) => item.correct ? this.correctResults.push(item) : this.incorrectResults
      .push(item)
    )
    if(this.gameResults.length > 0 && this.gameResults[this.gameResults.length-1].score) {
      this.totalScore = this.gameResults[this.gameResults.length - 1].score as number;
    }
  }

  playAudio(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    const audio = target.firstChild as HTMLAudioElement;
    audio.load();
    audio.play();
  }
}
