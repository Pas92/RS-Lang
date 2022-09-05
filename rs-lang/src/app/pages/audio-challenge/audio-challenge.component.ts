import { Component, OnDestroy, OnInit } from '@angular/core';
import { WordsService } from 'src/app/services/requests/words.service';
import { WordData } from 'src/app/models/requests.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss']
})
export class AudioChallengeComponent implements OnInit, OnDestroy {
  dataPage: WordData[] = [];

  active = 0;

  group = 0;

  page = 0;

  isStart = false;

  newSubscribtion!: Subscription;

  str = window.location.href;

  bottonTry = false

  queryParams: Subscription

  params= false


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
  ];

  constructor(private wordsService: WordsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkQueryParams()
    this.chechUrl();
  }

  chechUrl() {
    if (this.params) {
      this.newSubscribtion = this.wordsService.getTextbookGameDataWithMinWordsCount(this.group, this.page).subscribe((data: WordData[]) => {
        console.log(data);

        this.dataPage = data;
      });
      this.isStart = true;
    } else {
      let randomPage = Math.floor(Math.random() * (29 - 0 + 1) + 0);
      this.page = randomPage;
      this.newSubscribtion = this.wordsService.getData(this.group, this.page).subscribe((data: WordData[]) => {
        this.dataPage = data;
      });
    }
  }


  checkQueryParams(): void {
    this.queryParams = this.activatedRoute.queryParams
    .subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.params = true;
        this.group = params['group'];
        this.page = params['page'];
      }
    });
  }



  changeGroup(event: Event): void {
    let value = +((event.currentTarget as HTMLButtonElement).value);
    this.group = value;
    localStorage.setItem('page-group', (event.currentTarget as HTMLButtonElement).value);
    this.changeData();
  }


  changeData(): void {
    let newData = this.wordsService.getData(this.group, this.page);
    newData.subscribe(data => {
      localStorage.setItem('data-page-game', JSON.stringify(data));
      this.dataPage = data;
    });
  }


  comeBack(): void {
    if (this.str.includes('?')) {
      this.router.navigate(['/textbook'])
    } else {
      this.isStart = !this.isStart;
    }
    this.params = false;
  }

  tryAgain(): void {
    this.comeBack()
    setTimeout(() => {
      this.comeBack()
    }, 0);

  }


  public onChange(isAdd: boolean): void {
    this.bottonTry = isAdd
 }


  ngOnDestroy(): void {
    this.newSubscribtion?.unsubscribe();
    this.queryParams?.unsubscribe();
  }
}
