import { Component, Input, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {

  constructor() { }

  @Input() wordData: WordData = {
    _id: 'unknown',
    group: NaN,
    page: NaN,
    word: 'unknown',
    image: 'unknown',
    audio: 'unknown',
    audioMeaning: 'unknown',
    audioExample: 'unknown',
    textMeaning: 'unknown',
    textExample: 'unknown',
    transcription: 'unknown',
    wordTranslate: 'unknown',
    textMeaningTranslate: 'unknown',
    textExampleTranslate: 'unknown'
  }

  ngOnInit(): void {
  }

}
