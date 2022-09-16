import { Injectable } from '@angular/core';
import { GameResult, UserWordData, WordData } from 'src/app/models/requests.model';
import { sprintWord } from './game-view/game-view.component';


@Injectable({
  providedIn: 'root'
})
export class SprintService {
  scoreAdd: number = 10
  scoreLevel: number = 0
  totalScore: number = 0
  answer: string
  correctAnswer: boolean = true
  currentWord: sprintWord
  result: GameResult

  getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }

  shuffleData(array: WordData[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  getRandomWord(data: WordData[]): sprintWord {
    const length = data.length;
    this.shuffleData(data);
    const currectEl = data[length - 1];
    const wordRus = Math.random() > 0.5 ? data[this.getRandomNumber(length)].wordTranslate : currectEl.wordTranslate;

    this.currentWord = {
      word: currectEl.word,
      wordTranslate: currectEl.wordTranslate,
      wordRus: wordRus,
      audio: currectEl.audio,
      userWordData: {
        _id: currectEl._id,
        userWord: currectEl.userWord as UserWordData,
    }
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

  returnResult(): GameResult {
    return {
      word: this.currentWord.word,
      audio: this.currentWord.audio,
      wordTranslate: this.currentWord.wordTranslate,
      correct: this.answer === 'correct',
      score: this.totalScore
    }
  }

  onClick(key: number): void {
    this.correctAnswer = this.checkWord();
    this.answer = this.checkAnswer(key);
    this.result = this.returnResult();
    this.onCorrectAnswer();
  }
}
