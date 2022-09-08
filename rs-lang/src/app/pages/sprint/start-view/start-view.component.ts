import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent {
  originalBtnColor: string = 'accent'
  clickedBtnColor: string = 'primary'

  buttons: {name: string, key: number}[] = [
    {name: 'A1', key: 0},
    {name: 'A2', key: 1},
    {name: 'B1', key: 2},
    {name: 'B2', key: 3},
    {name: 'C1', key: 4},
    {name: 'C2', key: 5},
  ]
  activeIndex: number = 0

  @Output()
  level: number = 0

  @Output()
  clickBtn: EventEmitter<number> = new EventEmitter<number>();

  onLevelClick(level: number) {
    this.level = level;
  }

  onStartClick(): void {
    this.clickBtn.emit(this.level);
  }

}
