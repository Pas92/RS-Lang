import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/models/requests.model';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {
  @Input()
  results: Result[]

  correctResults: Result[] = []
  incorrectResults: Result[] = []
  totalScore: number

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.results.forEach((item) => item.correct ? this.correctResults.push(item) : this.incorrectResults
      .push(item)
    )
    this.totalScore = this.results[this.results.length - 1].score as number;
  }

  playAudio(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    const audio = target.firstChild as HTMLAudioElement;
    audio.load();
    audio.play();
  }

  closeGame(): void {
    this.router.navigate(['/']);
  }
}
