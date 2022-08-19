import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {
  showGame: boolean = false;
  showStart: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(event: number) {
    this.showGame = !this.showGame;
    this.showStart = !this.showStart;
    console.log(event);
  }


}
