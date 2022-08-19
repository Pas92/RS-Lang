import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit {

  @Output()
  level: number = 0

  @Output()
  clickBtn: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
   }

  ngOnInit(): void {
  }

  onLevelClick(level: number) {
    this.level = level;
  }

  onStartClick(): void {
    this.clickBtn.emit(this.level);
  }

}
