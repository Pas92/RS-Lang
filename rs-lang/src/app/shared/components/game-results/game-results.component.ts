import { Component, Input } from '@angular/core';
import { GameResult } from 'src/app/models/requests.model';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent {

  @Input()
  results: GameResult[]

}
