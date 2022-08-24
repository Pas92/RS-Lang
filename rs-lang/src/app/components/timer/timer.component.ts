import { Component, OnInit } from '@angular/core';
import { interval, Observable, timer } from 'rxjs';
import { takeWhile, scan } from 'rxjs/operators';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  maxTime: number = 60
  spinnerValue: number = 0
  data: number = 0
  obsTime$: Observable<number>
  obsSpinner$: Observable<number>

  constructor() { }

  ngOnInit(): void {
    this.obsTime$ = timer(0, 1000).pipe(
      scan(ticks => --ticks, this.maxTime),
      takeWhile(value => value >= 0 )
    )
    this.obsSpinner$ = timer(0, 1000).pipe(
      scan(ticks => ticks+= 100/this.maxTime, this.spinnerValue),
      takeWhile(value => value <= 101 )
    )
  }

}
