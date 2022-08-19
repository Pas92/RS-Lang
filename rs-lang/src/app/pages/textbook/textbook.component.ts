import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss']
})
export class TextbookComponent implements OnInit {

  constructor(private wordService: WordsService) { }

  group = '0'
  page = '0'

  words: WordData[] = []

  pageStatus: boolean[] = new Array(30)

  checkedWord: string = ''


  wordCardData: WordData = {
  _id: '123',
    group: 0,
    page: 0,
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
    this.getNewData()

    this.pageStatus.fill(false)
  }

  getNewData() {
    this.wordService.getData(+this.group, +this.page).subscribe((data: WordData[]) => {
      console.log(data)
      this.wordCardData = data[0]
      this.words = data
    })
  }

  changeGroup() {
    this.page = '0'
    console.log(this.group)
    this.getNewData()
  }

  changePage() {
    this.getNewData()
    console.log(this.page)
  }

  changeWordCardData() {
    console.log(this.checkedWord)
    this.wordCardData = this.words.filter(e => e.word === this.checkedWord)[0]
  }
}
