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
    this.wordService.updateUserDataForWord('5e9f5ee35eb9e72bc21af4a0', {
      difficulty: 'normal',
      optional: {
        isUsed: true
      }
    }).subscribe()

    this.wordService.getData(0, 0).subscribe((data: WordData[]) => {
      console.log(data)
    })
  }
}
