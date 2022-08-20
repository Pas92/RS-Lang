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
  }

  closeStart() {
    console.log('start');
  }

  closeGame() {
    this.changeView();
  }

  changeView(): void {
    this.showGame = !this.showGame;
    this.showStart = !this.showStart;
  }
}
