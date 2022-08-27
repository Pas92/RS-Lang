import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/requests.model';

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
