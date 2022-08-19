import { Component, Input, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';

@Component({
  selector: 'app-audio-calleng-game',
  templateUrl: './audio-calleng-game.component.html',
  styleUrls: ['./audio-calleng-game.component.scss']
})
export class AudioCallengGameComponent implements OnInit {
  @Input()
  getDataGame!: WordData[];

  randomDataGame!: WordData[];

  dataChooseButtons!: WordData[];

  randomOrderButtons!: WordData[];

  wordCount = 0;

  result: boolean = false;

  match!: boolean;

  shown: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    document.querySelector('.red')?.classList.remove('red')
    document.querySelector('.green')?.classList.remove('green')
    this.result = false;
    this.getRandomData();
    this.getRandomOrderButtons();


    /*     console.log('sound', this.dataChooseButtons);
        console.log('buttons',this.randomOrderButtons); */
    console.log(this.shown);
  }

  printData() {
    console.log(this.getDataGame);
  }

  getRandomData() {
    let randomArray = this.getRandomeArray();
    if (this.shown.includes(this.getDataGame[randomArray[0]].word)) {
      console.log('repeat');

    }
    // console.log('randomnum', randomArray);
    this.randomDataGame = [];
    for (let i = 0; i < randomArray.length; i++) {
      this.randomDataGame.push(this.getDataGame[randomArray[i]]);
    }
    //console.log(this.randomDataGame);
    this.temporaryDataButton();
  }


  getRandomeArray() {
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

  temporaryDataButton() {
    let arr = [];
    arr.push(this.randomDataGame[this.wordCount]);
    this.wordCount++;
    console.log('count', this.wordCount);
    let data = this.randomDataGame;
    data = data.splice(10, 5);
    arr.concat(data);
    //console.log(data);
    this.dataChooseButtons = data;
    this.shown.push(data[0].word);
  }

  getRandomOrderButtons() {

    function shufflett(array: Array<WordData>) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const data = this.dataChooseButtons;
    let arr: Array<WordData> = [];
    data.forEach(el => arr.push(el));
    let dataaar = shufflett(arr);
    this.randomOrderButtons = dataaar;
  }

  onChoose(a: string, b: string, event: any) {
    if (a === b) {
      this.match = true;
      console.log('true');
      event.currentTarget.classList.add('green')
      this.result = true


    } else {
      this.match = true;
      console.log('false');
      event.currentTarget.classList.add('red')
      this.result = true
    }
  }



}
