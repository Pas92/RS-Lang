import { Component, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss']
})
export class TextbookComponent implements OnInit {

  constructor(private wordService: WordsService) { }

  count1 = 0
  count2 = 0

  testData: WordData = {
  _id: '123',
    group: 999,
    page: 999,
    word: 'word',
    image: 'image',
    audio: 'audio',
    audioMeaning: 'audioMeaning',
    audioExample: 'audioExample',
    textMeaning: 'textMeaning',
    textExample: 'textExample',
    transcription: 'transcription',
    wordTranslate: 'wordTranslate',
    textMeaningTranslate: 'textMeaningTranslate',
    textExampleTranslate: 'textExampleTranslate'
}
  ngOnInit(): void {
    this.wordService.getData(0, 0).subscribe((data: WordData[]) => {
      console.log(data);
      this.testData = data[0]
    })
  }

  getNewData() {
    this.wordService.getData(this.count1, ++this.count2).subscribe((data: WordData[]) => {
      console.log(data)
      this.testData = data[0]
    })
  }
}
