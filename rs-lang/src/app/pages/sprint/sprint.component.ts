import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameResult } from 'src/app/models/requests.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

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
      this.router.navigate(['/']);
    }
    if(this.showGame) {
      this.showGame = false;
      this.showStart = true;
      this.router.navigate(['/textbook']);
    }
    if(this.showResults) {
      this.showStart = true;
      this.showResults = false;
    }
  }

  onAgain(): void {
    this.showGame = true;
    this.showResults = false;
  }

  finishGame(event: GameResult[]): void {
        this.showGame = false;
        this.results = event;
        this.showResults = true;
  }

  ngOnDestroy() {
    this.queryParams.unsubscribe();
  }
}
