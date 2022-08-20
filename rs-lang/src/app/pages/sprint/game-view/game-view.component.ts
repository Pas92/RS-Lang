import { Component, Input, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';

interface IWord {
  word: string,
  wordTranslate: string,
  wordRus: string
}

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})

export class GameViewComponent implements OnInit {
  scoreLevel: number = 1
  totalScore: number = 1
  engWord:string = ''
  ruWord: string = ''
  currentWord: IWord

  @Input()
  group: number = 0

  constructor(private wordService: WordsService) {
    this.currentWord = {
      word: '',
      wordTranslate: '',
      wordRus: ''
    }
  }

  async ngOnInit(): Promise<void> {
   await this.wordService.getData(this.group, 0).subscribe((data: WordData[]) => {
      this.currentWord = this.getRandomWord(data)
      this.engWord = this.currentWord.word;
      this.ruWord = this.currentWord.wordRus;
    })
  }

  getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }

  getRandomWord(data: WordData[]): IWord {
    const length = data.length;
    const randomNum = this.getRandomNumber(length);
    return {
      word: data[randomNum].word,
      wordTranslate: data[randomNum].wordTranslate,
      wordRus: data[this.getRandomNumber(length)].wordTranslate,
    }
  }

  checkWord(): boolean {
    return this.currentWord.wordRus === this.currentWord.wordTranslate
  }


}
