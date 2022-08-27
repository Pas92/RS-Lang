import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})

export class SprintComponent {
  showResults: boolean = true;
  showGame: boolean = false;
  showStart: boolean = true;
  level: number = 0

  onButtonClick(event: number) {
    this.changeView();
    this.level = event;
    this.finishGame();
  }

  closeStart() {
    console.log('go to main');
  }

  closeGame() {
    this.changeView();
  }

  changeView(): void {
    this.showGame = !this.showGame;
    this.showStart = !this.showStart;
  }

  onCloseClick():void {
    if(this.showStart) {
      this.closeStart();
    }
    if(this.showGame) {
      this.closeGame();
    }
  }

  finishGame(): void {
    if (this.showGame) {
      setTimeout(() => {
        this.showGame = !this.showGame;
      }, 60000)
    }
  }
}
