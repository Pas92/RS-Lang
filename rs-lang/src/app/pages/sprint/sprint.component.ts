import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})

export class SprintComponent {
  showGame: boolean = false;
  showStart: boolean = true;
  level: number = 0

  constructor(private router: Router) {}

  onButtonClick(event: number) {
    this.changeView();
    this.level = event;
    this.finishGame();
  }

  closeStart() {
    this.router.navigate(['/']);
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
