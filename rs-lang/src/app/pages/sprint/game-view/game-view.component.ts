import { Component, HostListener, Input, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';

interface IWord {
  word: string,
  wordTranslate: string,
  wordRus: string,
}

type border = {
  border: string;
}

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})

export class GameViewComponent implements OnInit {
  scoreAdd: number = 10
  scoreLevel: number = 0
  totalScore: number = 0
  border: border = {'border': ''}

  engWord: string = ''
  ruWord: string = ''
  currentWord: IWord
  answer: string = ''
  words: WordData[] = []

  correctAnswer: boolean = true


  buttons = [
    {name: 'Неверно', key: 0},
    {name: 'Верно', key: 1}
  ]

  @Input()
  group: number = 0
  btnColor: string = 'accent'

  @HostListener('document:keydown', ['$event'])
  handleArrows(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.onClick(0)
    } else if (event.key === 'ArrowRight') {
      this.onClick(1)
    }
  }

  constructor(private wordService: WordsService) {
    this.currentWord = {
      word: '',
      wordTranslate: '',
      wordRus: '',
    }
  }

  // добавить выбор page - если учебник, если с меню, то рандом!!
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
    const wordRus = Math.random() > 0.5 ? data[this.getRandomNumber(length)].wordTranslate : wordTranslate;

    return {
      word: word,
      wordTranslate: wordTranslate,
      wordRus: wordRus,
    }
  }

  checkWord(): boolean {
    return this.currentWord.wordRus === this.currentWord.wordTranslate
  }

  checkAnswer(key: number): string {
    if (key === 0) {
      this.answer = this.correctAnswer ? 'incorrect' : 'correct';
    }
    if (key === 1) {
      this.answer = this.correctAnswer ? 'correct' : 'incorrect';
    }
    return this.answer;
  }

  addToTotal(): number {
    return this.totalScore += this.scoreAdd;
  }

  changeScoreLevel(): void {
      this.scoreLevel += 1;
    if (this.scoreLevel === 3) {
      this.scoreAdd +=10;
      this.scoreLevel = 0;
    }
  }

  changeBorderColor(color: string): void {
    this.border = { border: `2px solid ${color}`};
    setTimeout(() => {
      this.border = { border: ``}
    }, 1500);
  }

  onCorrectAnswer(): void {
    if (this.answer === 'correct') {
      this.addToTotal();
      this.changeScoreLevel();
      this.changeBorderColor('green');
    } else {
      this.changeBorderColor('red');
    }
  }

  onClick(key: number): void {
    this.correctAnswer = this.checkWord();
    this.answer = this.checkAnswer(key);
    this.onCorrectAnswer();
    this.renderWords(this.words);
  }
}
