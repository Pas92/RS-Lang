import { Component, OnInit } from '@angular/core';

export interface Result {
  word: string;
  audio?: string;
  wordTranslate: string;
  correct: boolean;
}

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {
  results: Result[] = [
    {audio: '', word: 'eng', wordTranslate: 'rus', correct: true},
    {audio: '', word: 'eng', wordTranslate: 'rus', correct: false},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
