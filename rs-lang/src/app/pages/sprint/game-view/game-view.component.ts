import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameResult, UserWordDataForStatistic, WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';
import { SprintService } from '../sprint.service';
import { Params } from '@angular/router';
import { StatisticHandlerService } from 'src/app/services/data-handlers/statistic-handler.service';

export interface sprintWord {
  word: string,
  wordTranslate: string,
  wordRus: string,
  audio?: string,
  userWordData?: UserWordDataForStatistic;
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
  groupQuantity: number = 6
  page: number = 0


  @Input()
  group: number = 0

  @Input()
  queryParams: Params

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

  constructor(private wordService: WordsService, private sprintService: SprintService, private statisticHandler: StatisticHandlerService) {
    this.currentWord = this.sprintService.currentWord;
  }

  ngOnInit() {
    if(this.queryParams) {
      this.group = this.queryParams['group'];
      this.page = this.queryParams['page'];
      this.customSubscription = this.wordService.getTextbookGameDataWithMinWordsCount(this.group, this.page).subscribe((data: WordData[]) => {
        this.getWords(data);
      })
    } else {
      this.page = this.getRandomPageNumber();
      this.customSubscription = this.wordService.getData(this.group, this.page).subscribe((data: WordData[]) => {
        this.getWords(data);
      })
    }
    if (localStorage.getItem('userToken')) {
    this.statisticHandler.startTrackingStatistic('sprint');
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

  sendStatistics(): void {
    if (localStorage.getItem('userToken')) {
      const userWordData = this.currentWord.userWordData as UserWordDataForStatistic;
    let returnedObj = this.statisticHandler.updateWordDataAndStatistic(userWordData, this.sprintService.result.correct);
    if(!!returnedObj) {
        this.wordService.updateUserDataForWord(userWordData._id, userWordData.userWord!).subscribe()
      }
    }
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
    this.sendStatistics();
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
