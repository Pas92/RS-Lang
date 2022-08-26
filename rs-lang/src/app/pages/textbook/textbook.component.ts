import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WordData } from 'src/app/models/requests.model';
import { AuthService } from 'src/app/services/requests/auth.service';
import { WordsService } from 'src/app/services/requests/words.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss']
})
export class TextbookComponent implements OnInit, OnDestroy {

  constructor(private wordService: WordsService, private authService: AuthService) { }

  group = '0'
  page = '0'

  isImgDownload: boolean = false

  words: WordData[] = []

  pageStatus: boolean[] = new Array(30)
  checkedWord: string = ''
  wordCardData!: WordData

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.getNewData()

    this.group = localStorage?.getItem('group') || '0'
    this.page = localStorage?.getItem('page') || '0'

    this.pageStatus.fill(false)
  }

  getNewData(): void {
    this.wordService.getData(+this.group, +this.page).pipe(takeUntil(this.destroy$)).subscribe((data: WordData[]) => {
      this.words = data
    })

    // this.wordService.getDataForTextbookGame(0, 1).subscribe((data: WordData[]) => {
    //   this.wordCardData = data[0]
    //   this.words = data
    // })
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
