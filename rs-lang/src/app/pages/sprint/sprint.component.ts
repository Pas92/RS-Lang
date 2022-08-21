import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {
  showGame: boolean = false;
  showStart: boolean = true;
  level: number = 0

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(event: number) {
    this.changeView();
    this.level = event;
    this.finishGame();
  }

  closeStart() {
    console.log('closeStart');
  }

  closeGame() {
    this.changeView();
  }

  changeView(): void {
    this.showGame = !this.showGame;
    this.showStart = !this.showStart;
  }

  // check finish game + add maxtime variable

  finishGame(): void {
    if (this.showGame) {
      setTimeout(() => {
        this.showGame = !this.showGame;
      }, 60000)
    }
  }
}
