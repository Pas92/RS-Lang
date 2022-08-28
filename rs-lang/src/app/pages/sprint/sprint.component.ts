import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/requests.model';

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
  results: Result[]

  onButtonClick(event: number) {
    this.showStart = false;
    this.showGame = true;
    this.level = event;
  }

  closeStart() {
    console.log('go to main');
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

  finishGame(event: Result[]): void {
        this.showGame = false;
        this.results = event;
        this.showResults = true;
  }
}
