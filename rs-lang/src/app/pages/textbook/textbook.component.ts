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

  group = '0'
  page = '0'

  words: WordData[] = []

  pageStatus: boolean[] = new Array(30)
  checkedWord: string = ''
  wordCardData!: WordData

  ngOnInit(): void {
    this.getNewData()

    this.group = localStorage?.getItem('group') || '0'
    this.page = localStorage?.getItem('page') || '0'

    this.pageStatus.fill(false)
  }

  getNewData() {
    this.wordService.getData(+this.group, +this.page).subscribe((data: WordData[]) => {
      this.wordCardData = data[0]
      this.words = data
    })
  }

  changeGroup() {
    this.page = '0'
    this.getNewData()
  }

  changePage() {
    this.getNewData()
  }

  changeWordCardData() {
    this.wordCardData = this.words.filter(e => e.word === this.checkedWord)[0]
  }
}
