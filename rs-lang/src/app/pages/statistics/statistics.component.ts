import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  showToday = true;

  showAll = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  showShortTerm() {
    this.showToday = true;
    this.showAll = false;
  }

  showLongTerm() {
    this.showToday = false;
    this.showAll = true;
  }
}
