import { Component, Input, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';

interface IWord {
  word: string,
  wordTranslate: string,
  wordRus: string,
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
  answer: string = ''
  correctAnswer: boolean = true
  words: WordData[] = []

  buttons = [
    {name: 'Неверно', key: 0},
    {name: 'Верно', key: 1}
  ]

  @Input()
  group: number = 0
  btnColor: string = 'accent'

  constructor(private wordService: WordsService) {
    this.currentWord = {
      word: '',
      wordTranslate: '',
      wordRus: '',
    }
  }

  async ngOnInit(): Promise<void> {
   await this.wordService.getData(this.group, 0).subscribe((data: WordData[]) => {
      this.words = data;
      this.renderWords(this.words);
    })
  }

  renderWords(data: WordData[]) {
    this.currentWord = this.getRandomWord(data)
    this.engWord = this.currentWord.word;
    this.ruWord = this.currentWord.wordRus;
  }

  getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }

  getRandomWord(data: WordData[]): IWord {
    const length = data.length;
    const randomNum = this.getRandomNumber(length);
    const word = data[randomNum].word;
    const wordTranslate = data[randomNum].wordTranslate;
    const wordRus = data[this.getRandomNumber(length)].wordTranslate;

    return {
      word: word,
      wordTranslate: wordTranslate,
      wordRus: wordRus,
    }
  }

  checkWord(): boolean {
    return this.currentWord.wordRus === this.currentWord.wordTranslate
  }

  checkAnswer(key: number) {
    if(key === 0) {
      this.answer = this.correctAnswer ? 'incorrect' : 'correct';
    }
    if (key === 1) {
      this.answer = this.correctAnswer ? 'correct' : 'incorrect';
    }
    return this.answer;
  }

  onClick(key: number) {
    this.correctAnswer = this.checkWord();
    this.answer = this.checkAnswer(key);
    console.log(this.answer);
    this.renderWords(this.words);
  }
}
