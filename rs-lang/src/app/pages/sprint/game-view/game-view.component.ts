import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameResult, WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';
import { SprintService } from '../sprint.service';

export interface sprintWord {
  word: string,
  wordTranslate: string,
  wordRus: string,
  audio?: string,
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

export class GameViewComponent implements OnInit, OnDestroy {
  customSubscription: Subscription
  border: border = {'border': ''}
  scoreAdd: number = 10
  scoreLevel: number = 0
  totalScore: number = 0
  engWord: string
  ruWord: string
  answer: string
  currentWord: sprintWord
  words: WordData[] = []
  results: GameResult[] = []

  @Input()
  group: number = 0

  page: number = 0

  @Output()
  finishGame: EventEmitter<GameResult[]> = new EventEmitter<GameResult[]>();

  @HostListener('document:keydown', ['$event'])
  handleArrows(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.onClick(0)
    } else if (event.key === 'ArrowRight') {
      this.onClick(1)
    }
  }

  constructor(private wordService: WordsService, private SprintService: SprintService ) {
    this.currentWord = this.SprintService.currentWord;
  }

  ngOnInit() {
   this.customSubscription = this.wordService.getData(this.group, this.page).subscribe((data: WordData[]) => {
      this.words = data;
      this.renderWords(this.words);
      setTimeout(() => {
        this.finishGame.emit(this.results);
      }, 60000)
    });
  }

  renderWords(words: WordData[]): void {
    if (this.words.length > 0) {
      this.currentWord = this.SprintService.getRandomWord(words);
      this.engWord = this.currentWord.word;
      this.ruWord = this.currentWord.wordRus;
    }
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
    this.answer = this.SprintService.answer;
    this.onCorrectAnswer();
    this.results.push(this.SprintService.result);
    this.words.pop();
    this.onFinishGame();
    this.renderWords(this.words);
  }

  onFinishGame(): void {
    if (this.words.length === 0) {
      this.finishGame.emit(this.results);
    }
  }

  ngOnDestroy(): void {
    this.customSubscription.unsubscribe();
  }
}
