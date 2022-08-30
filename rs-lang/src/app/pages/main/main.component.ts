import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StatisticHandlerService } from 'src/app/services/data-handlers/statistic-handler.service';
import { AuthService } from 'src/app/services/requests/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
