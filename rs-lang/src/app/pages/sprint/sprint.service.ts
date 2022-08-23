import { Injectable } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { IWord } from './game-view/game-view.component';


@Injectable({
  providedIn: 'root'
})
export class SprintService {
  scoreAdd: number = 10
  scoreLevel: number = 0
  totalScore: number = 0
  engWord: string = ''
  ruWord: string = ''
  answer: string = ''
  correctAnswer: boolean = true
  currentWord = {
    word: '',
    wordTranslate: '',
    wordRus: '',
  }

  constructor() {
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
    this.currentWord = {
      word: word,
      wordTranslate: wordTranslate,
      wordRus: wordRus,
    }

    return this.currentWord;
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

  onCorrectAnswer(): void {
    if (this.answer === 'correct') {
      this.addToTotal();
      this.changeScoreLevel();
    }
  }

  onClick(key: number): void {
    this.correctAnswer = this.checkWord();
    this.answer = this.checkAnswer(key);
    this.onCorrectAnswer();
  }
}
