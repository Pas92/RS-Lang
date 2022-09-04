import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameResult } from 'src/app/models/requests.model';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})

export class SprintComponent {
  showStart: boolean = true;
  showGame: boolean = false;
  showResults: boolean = false;
  level: number = 0
  results: GameResult[]

  constructor(private router: Router) {}

  onButtonClick(event: number) {
    this.showStart = false;
    this.showGame = true;
    this.level = event;
  }

  closeStart() {
    this.router.navigate(['/']);
  }

  onCloseClick():void {
    if(this.showStart) {
      this.closeStart();
    }
    if(this.showGame) {
      this.showGame = false;
      this.showStart = true;
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
}
