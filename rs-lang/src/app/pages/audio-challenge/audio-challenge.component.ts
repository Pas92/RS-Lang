import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/services/requests/words.service';
import { WordData } from 'src/app/models/requests.model';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss']
})
export class AudioChallengeComponent implements OnInit {
  dataPage: WordData[] = [];

  group = 0;

  page = 0;

  isStart = false;

  buttons = [
    {
      value: 0,
      content: 'A1'
    },
    {
      value: 1,
      content: 'A2'
    },
    {
      value: 2,
      content: 'B1'
    },
    {
      value: 3,
      content: 'B2'
    },
    {
      value: 4,
      content: 'C1'
    },
    {
      value: 5,
      content: 'C2'
    },
  ]

  constructor(private wordsService: WordsService) { }

  ngOnInit(): void {
    let randomPage = Math.floor(Math.random() * (29 - 0 + 1) + 0);
    console.log(randomPage);
    this.page = randomPage;

    let dataw = this.wordsService.getData(this.group, this.page);
    dataw.subscribe(data => {
      console.log(data);
      localStorage.setItem('data-page-game', JSON.stringify(data));
      this.dataPage = data;
    });
  }

  changeGroup(event: any): void {
    let value = +(event.currentTarget.value);
    this.group = value;
    event.currentTarget.style.background = 'green';
    localStorage.setItem('page-group', event.currentTarget.value);
    console.log(this.group);
    this.changeData();
  }


  changeData(): void {
    let newData = this.wordsService.getData(this.group, this.page);
    newData.subscribe(data => {
      console.log(data);
      localStorage.setItem('data-page-game', JSON.stringify(data));
      this.dataPage = data;
      console.log(this.dataPage);
    });
  }


}
