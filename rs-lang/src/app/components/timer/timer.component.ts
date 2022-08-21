import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  maxTime: number = 60
  timerValue: number = 60
  spinnerValue: number = 0
  data: number = 0

  constructor() { }

  ngOnInit(): void {
    const obs$ = interval(1000);

    obs$.pipe(takeWhile(value => value < this.maxTime))
        .subscribe(() => {
          this.timerValue -= 1
        this.spinnerValue += 100/this.maxTime;
      });
  }

}
