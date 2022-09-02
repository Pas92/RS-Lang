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
  results: GameResult[]

  correctResults: GameResult[] = []
  incorrectResults: GameResult[] = []
  totalScore: number

  ngOnInit(): void {
    this.results.forEach((item) => item.correct ? this.correctResults.push(item) : this.incorrectResults
      .push(item)
    )
    if(this.results.length > 0 && this.results[this.results.length-1].score) {
      this.totalScore = this.results[this.results.length - 1].score as number;
    }
  }

  playAudio(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    const audio = target.firstChild as HTMLAudioElement;
    audio.load();
    audio.play();
  }
}
