import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WordData } from 'src/app/models/requests.model';
import { WordsService } from 'src/app/services/requests/words.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss']
})
export class TextbookComponent implements OnInit, OnDestroy {

  constructor(private wordService: WordsService) { }

  group = '0'
  page = '0'

  isImgDownload: boolean = false

  words: WordData[] = []

  pageStatus: boolean[] = new Array(30)
  checkedWord: string = ''
  wordCardData!: WordData

  destroy$: Subject<boolean> = new Subject<boolean>();

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

    this.getNewData()

    this.group = localStorage?.getItem('group') || '0'
    this.page = localStorage?.getItem('page') || '0'

    this.pageStatus.fill(false)
  }

  getNewData(): void {
    this.wordService.getData(+this.group, +this.page).pipe(takeUntil(this.destroy$)).subscribe((data: WordData[]) => {
      console.log(data.map(e => e.userWord?.optional?.rating))
    })

    this.wordService.getDataForTextbookGame(0, 1).subscribe((data: WordData[]) => {
      this.wordCardData = data[0]
      this.words = data
    })
  }

  changeGroup(): void {
    this.page = '0'
    this.getNewData()
  }

  changePage(): void {
    this.getNewData()
  }

  changeWordCardData(): void {
    this.wordCardData = this.words.filter(e => e.word === this.checkedWord)[0]
    this.isImgDownload = false
  }

  hideSpinner(): void {
    this.isImgDownload = true
    console.log('loadImg')
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
