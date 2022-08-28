import { Component, HostListener, Input, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';
import { SprintService } from '../sprint.service';

export interface IWord {
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
  styleUrls: ['./game-view.component.scss'],
  providers: [SprintService]
})

export class GameViewComponent implements OnInit {
  border: border = {'border': ''}
  scoreAdd: number = 10
  scoreLevel: number = 0
  totalScore: number = 0
  engWord: string = ''
  ruWord: string = ''
  currentWord: IWord
  answer: string = ''
  words: WordData[] = []

  @Input()
  group: number = 0

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
    this.words.pop();
    this.renderWords(this.words);
  }
}
