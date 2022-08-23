import { Component, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss']
})
export class TextbookComponent implements OnInit {

  constructor(private wordService: WordsService) { }

  ngOnInit(): void {
    // this.wordService.updateUserDataForWord('5e9f5ee35eb9e72bc21af4bd', {
    //   difficulty: 'normal',
    //   optional: {
    //     rating: 7,
    //     sprintTotal: 0,
    //     sprintErrors: 0,
    //     audioChallengeTotal: 0,
    //     audioChallengeErrors: 0,
    //     isUsedInTextBook: false,
    //     isUsedInSprintGame: false,
    //     isUsedInAudioChallengeGame: false
    //   }
    // }).subscribe()

    this.wordService.getData(0, 0).subscribe((data: WordData[]) => {
      console.log(data.map(e => e.userWord?.optional?.rating))
    })

    this.wordService.getDataForTextbookGame(0, 1).subscribe((data: WordData[]) => {
      console.log(data)
    })
  }
}
