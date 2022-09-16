import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameResult } from 'src/app/models/requests.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatisticHandlerService } from 'src/app/services/data-handlers/statistic-handler.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})

export class SprintComponent implements OnInit, OnDestroy {
  queryParams: Subscription
  query: Params
  showStart: boolean = true
  showGame: boolean = false
  showResults: boolean = false
  level: number = 0
  results: GameResult[]

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private statisticHandler: StatisticHandlerService) {}

  ngOnInit() {
    this.checkQueryParams()
  }

  checkQueryParams(): void {
    this.queryParams = this.activatedRoute.queryParams
    .subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.showStart = false;
        this.showGame = true;
        this.query = params;
      }
    });
  }

  onButtonClick(event: number) {
    this.showStart = false;
    this.showGame = true;
    this.level = event;
  }

  onCloseClick():void {
    if(this.showStart) {
      this.query ? this.router.navigate(['/textbook']) : this.router.navigate(['/']);
    }
    if(this.showGame) {
      this.showGame = false;
      if (this.query) {
        this.router.navigate(['/textbook']);
      } else {
        this.showStart = true;
      }
    }
    if(this.showResults) {
      this.showResults = false;
      if (this.query) {
        this.router.navigate(['/textbook']);
      } else {
        this.showStart = true;
      }
    }
  }

  onAgain(): void {
    if (this.query) {
      this.showGame = true;
      this.showResults = false;
    } else {
      this.showStart = true;
      this.showResults = false;
    }
  }

  finishGame(event: GameResult[]): void {
        this.showGame = false;
        this.results = event;
        this.showResults = true;
        if (localStorage.getItem('userToken')) {
        this.statisticHandler.stopTrackingStatistic();
        }
  }

  ngOnDestroy() {
    this.queryParams.unsubscribe();
  }
}
