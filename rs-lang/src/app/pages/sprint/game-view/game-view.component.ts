import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameResult, WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';
import { SprintService } from '../sprint.service';
import { ActivatedRoute, Params } from '@angular/router';

export interface sprintWord {
  word: string,
  wordTranslate: string,
  wordRus: string,
  audio?: string,
}

type border = {
  border: string;
}

type params = {
  group: number;
  page: number;
}

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  providers: [SprintService]
})

export class GameViewComponent implements OnInit, OnDestroy {
  customSubscription: Subscription
  queryParams: Subscription
  params: Params

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

  groupQuantity: number = 6
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

  constructor(private wordService: WordsService, private sprintService: SprintService, private activatedRoute: ActivatedRoute ) {
    this.currentWord = this.sprintService.currentWord;
  }

  ngOnInit() {
    this.checkQueryParams();
    console.log('this.params', this.params);

    if(this.params) {
      this.customSubscription = this.wordService.getTextbookGameDataWithMinWordsCount(this.group, this.page).subscribe((data: WordData[]) => {
        this.getWords(data);
      })
    } else {
      this.page = this.getRandomPageNumber();
      this.customSubscription = this.wordService.getData(this.group, this.page).subscribe((data: WordData[]) => {
        this.getWords(data);
      })
    }
   }

   getRandomPageNumber(): number {
     return this.sprintService.getRandomNumber(this.groupQuantity);
   }

   getWords(data: WordData[]): void {
      this.words = data;
      this.renderWords(this.words);
      setTimeout(() => {
        this.finishGame.emit(this.results);
      }, 60000)
   }

  checkQueryParams(): void {
    this.queryParams = this.activatedRoute.queryParams
    .subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.params = params;
        this.group = params['group'];
        this.page = params['page'];
      }
    });
  }

  renderWords(words: WordData[]): void {
    if (this.words.length > 0) {
      this.currentWord = this.sprintService.getRandomWord(words);
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
    if (this.sprintService.answer === 'correct') {
      this.totalScore = this.sprintService.totalScore;
      this.scoreAdd = this.sprintService.scoreAdd;
      this.scoreLevel = this.sprintService.scoreLevel;
      this.changeBorderColor('green');
    } else {
      this.changeBorderColor('red');
    }
  }

  onClick(key: number): void {
    this.sprintService.onClick(key);
    this.answer = this.sprintService.answer;
    this.onCorrectAnswer();
    this.results.push(this.sprintService.result);
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
