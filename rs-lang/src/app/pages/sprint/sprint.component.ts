import { Component, OnInit } from '@angular/core';

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

  onButtonClick(event: number) {
    this.showStart = false;
    this.showGame = true;
    this.level = event;
    this.finishGame();
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

  finishGame(): void {
    if (this.showGame) {
      setTimeout(() => {
        this.showGame = false;
        this.showResults = true;
      }, 60000)
    }
  }
}
