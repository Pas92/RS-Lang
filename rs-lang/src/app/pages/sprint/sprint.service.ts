import { Injectable, Input } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';
import { IWord } from './game-view/game-view.component';

type border = {
  border: string;
}

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  scoreAdd: number = 10
  scoreLevel: number = 0
  totalScore: number = 0
  answer: string = ''
  correctAnswer: boolean = true
  currentWord = {
    word: '',
    wordTranslate: '',
    wordRus: '',
  }
  words: WordData[] = []

  @Input()
  group: number = 0

  constructor(private wordService: WordsService) {
  }

  getWords() {
    this.wordService.getData(this.group, 0).subscribe((data: WordData[]) => {
      this.words = data;
    })
  }

  getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }

  getRandomWord(): IWord {
    console.log(this.words);
    const length = this.words.length;
    const randomNum = this.getRandomNumber(length);
    const word = this.words[randomNum].word;
    const wordTranslate = this.words[randomNum].wordTranslate;
    const wordRus = Math.random() > 0.5 ? this.words[this.getRandomNumber(length)].wordTranslate : wordTranslate;

    return {
      word: word,
      wordTranslate: wordTranslate,
      wordRus: wordRus,
    }
  }

  checkWord(currentWord: IWord): void {
    this.correctAnswer = currentWord.wordRus === currentWord.wordTranslate
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

  changeScoreLevel(scoreLevel: number, scoreAdd: number): void {
      scoreLevel += 1;
    if (scoreLevel === 3) {
      scoreAdd +=10;
      scoreLevel = 0;
    }
  }

  onCorrectAnswer(scoreLevel: number, scoreAdd: number): void {
    // if (this.answer === 'correct') {
      this.addToTotal();
      this.changeScoreLevel(scoreLevel, scoreAdd);
    //   this.changeBorderColor('green');
    // } else {
    //   this.changeBorderColor('red');
    // }
  }
}
