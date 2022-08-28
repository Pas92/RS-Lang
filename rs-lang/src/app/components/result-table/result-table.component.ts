import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.results.forEach((item) => item.correct ? this.correctResults.push(item) : this.incorrectResults
      .push(item)
    )
  }
}
