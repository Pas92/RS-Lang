import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Result, WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';
import { SprintService } from '../sprint.service';

export interface sprintWord {
  word: string,
  wordTranslate: string,
  wordRus: string,
  audio: string,
}

type border = {
  border: string;
}

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  providers: [SprintService]
})

export class GameViewComponent implements OnInit {
  border: border = {'border': ''}
  scoreAdd: number = 10
  scoreLevel: number = 0
  totalScore: number = 0
  engWord: string
  ruWord: string
  answer: string
  currentWord: sprintWord
  words: WordData[] = []
  results: Result[] = []

  @Input()
  group: number = 0

  @Output()
  finishGame: EventEmitter<Result[]> = new EventEmitter<Result[]>();

  constructor(private wordService: WordsService, public SprintService: SprintService ) {
    this.currentWord = this.SprintService.currentWord;
    this.answer = this.SprintService.answer;
  }

  ngOnInit() {
   this.wordService.getData(this.group, 0).subscribe((data: WordData[]) => {
      this.words = data;
      this.renderWords(this.words);
    })
  }

  renderWords(words: WordData[]): void {
    this.currentWord = this.SprintService.getRandomWord(words)
    this.engWord = this.currentWord.word;
    this.ruWord = this.currentWord.wordRus;
  }

  changeBorderColor(color: string): void {
    this.border = { border: `2px solid ${color}`};
    setTimeout(() => {
      this.border = { border: ``}
    }, 1500);
  }

  onCorrectAnswer(): void {
    if (this.SprintService.answer === 'correct') {
      this.totalScore = this.SprintService.totalScore;
      this.scoreAdd = this.SprintService.scoreAdd;
      this.scoreLevel = this.SprintService.scoreLevel;
      this.changeBorderColor('green');
    } else {
      this.changeBorderColor('red');
    }
  }

  onClick(key: number): void {
    this.SprintService.onClick(key);
    this.onCorrectAnswer();
    this.results.push(this.SprintService.result);
    this.words.pop();
    this.onFinishGame();
    this.renderWords(this.words);
  }

  onArrows(key: number): void {
    console.log('key');
    this.onClick(key);
  }

  onFinishGame() {
    if (this.words.length === 0) {
      this.finishGame.emit(this.results);
    }
  }
}
