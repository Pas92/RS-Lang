import { Component, Input, OnInit } from '@angular/core';
import { BASE_URL, gameResult, WordData } from 'src/app/models/requests.model';

@Component({
  selector: 'app-audio-calleng-game',
  templateUrl: './audio-calleng-game.component.html',
  styleUrls: ['./audio-calleng-game.component.scss']
})
export class AudioCallengGameComponent implements OnInit {
  @Input()
  getDataGame!: WordData[];

  randomDataGame!: WordData[];

  countWordsInGame = 1;

  randomWodsforGame!: WordData[];

  buttonsGame!: WordData[];

  tempFiveButton!: WordData[];

  resultArray: Array<gameResult> = [];

  pushButton!: HTMLElement;

  result: boolean = false;

  match!: boolean;

  falseAnswers = 0;

  disebled = false;

  constructor() { }

  ngOnInit(): void {
    this.result = false;
    this.getDataForWords();
    this.getButtonsRandom();
  }

  getRandomeArray(): number[] {
    function shuffle(array: Array<number>) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const ARRAY_PAGE_INDEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const data = shuffle(ARRAY_PAGE_INDEX);
    return data;
  }

  onChoose(a: string, b: string, event: any): void {
    if (a === b) {
      if (!this.disebled) {
        this.match = true;
        event.currentTarget.classList.add('green');
        this.disebled = true;
        this.pushButton = event.currentTarget;
        this.result = true;
        this.resultArray.push({
          word: this.randomWodsforGame[this.randomWodsforGame.length-1].word,
          audio: this.randomWodsforGame[this.randomWodsforGame.length-1].audio,
          wordTranslate: this.randomWodsforGame[this.randomWodsforGame.length-1].wordTranslate,
          correct: true,
        });
      }

    } else {
      if (!this.disebled) {
        this.match = false;
        event.currentTarget.classList.add('red');
        this.disebled = true;
        this.pushButton = event.currentTarget;
        this.result = true;
        this.resultArray.push({
          word: this.randomWodsforGame[this.randomWodsforGame.length-1].word,
          audio: this.randomWodsforGame[this.randomWodsforGame.length-1].audio,
          wordTranslate: this.randomWodsforGame[this.randomWodsforGame.length-1].wordTranslate,
          correct: false,
        });
        this.falseAnswers++;
      }
    }
  }

  getSound(): void {
    let audio = new Audio(`${BASE_URL}/${this.randomWodsforGame[this.randomWodsforGame.length-1].audio}`);
    audio.play();
  }

  getDataForWords(): void {
    let data = this.getDataGame;
    let randomeArray = this.getRandomeArray();
    let newData: WordData[] = [];
    for (let i = 0; i < randomeArray.length; i++) {
      newData.push(data[randomeArray[i]]);
    }
    this.randomWodsforGame = newData;
    this.buttonsGame = [...newData];
  }

  getButtonsRandom(): void {
    function shufflett(array: Array<WordData>) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    let arr: Array<WordData> = [];
    arr.push(this.randomWodsforGame[this.randomWodsforGame.length-1]);
    let array = this.buttonsGame.slice(11, 15);

    array.forEach(el => {
      if (el === this.randomWodsforGame[this.randomWodsforGame.length-1]) {
        let item = this.buttonsGame[7];
        arr.push(item);
        console.log('repeat');
      } else {
        arr.push(el);
      }
    });
    let newArr = shufflett(arr);
    this.tempFiveButton = newArr;

  }

  check(event: any): void {
    if (this.countWordsInGame > 19) {
      event.currentTarget.remove();
      console.log(this.resultArray);
      alert('the end game');
      return;
    } else if (this.falseAnswers >=5) {
      alert('you lose');
      return
    }
    this.disebled = false;
    if (this.pushButton.classList.contains('red')) {
      this.pushButton.classList.remove('red');
    } else if (this.pushButton.classList.contains('green')) {
      this.pushButton.classList.remove('green');
    }
    this.result = false;
    this.randomWodsforGame.pop();
    this.getButtonsRandom();
    this.countWordsInGame++;
  }
}
