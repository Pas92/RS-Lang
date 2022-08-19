import { Component, Input, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {
  scoreLevel: number = 1
  totalScore: number = 1
  engWord:string = 'eng'
  ruWord: string = 'rus'

  @Input()
  group: number = 0

  constructor(private wordService: WordsService) { }

  ngOnInit(): void {
    this.wordService.getData(this.group, 0).subscribe((data: WordData[]) => {
      console.log(data)
      const randomWord = this.getRandomWord(data)
      this.engWord = randomWord.word;
      this.ruWord = randomWord.wordRus;
    })
  }

  getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }

  getRandomWord(data: WordData[]): {word: string, wordTranslate: string, wordRus: string} {
    const length = data.length;
    const randomNum = this.getRandomNumber(length);
    return {
      word: data[randomNum].word,
      wordTranslate: data[randomNum].wordTranslate,
      wordRus: data[this.getRandomNumber(length)].wordTranslate,
    }
  }



}
