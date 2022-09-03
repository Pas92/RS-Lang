import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { DEFAULT_CUSTOM_USER_DATA, UserWordData, WordData, WordDataForRequest } from 'src/app/models/requests.model';
import { AuthService } from 'src/app/services/requests/auth.service';
import { WordsService } from 'src/app/services/requests/words.service';

const STYLE_CLASSES: string[] = [
  'a1-difficulty',
  'a2-difficulty',
  'b1-difficulty',
  'b2-difficulty',
  'c1-difficulty',
  'c2-difficulty',
]

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

  pageStatus: string[] = new Array(30)
  checkedWord: string = ''
  wordCardData!: WordData
  userWordData!: UserWordData
  isSignIn: boolean = false

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {


    this.authService.isSignIn$.subscribe((value: boolean) => {
      this.isSignIn = value
      this.getNewData()
    })

    this.group = localStorage?.getItem('group') || '0'
    this.page = localStorage?.getItem('page') || '0'

    this.pageStatus.fill('')
  }

  getNewData(): void {
    this.wordService.getData(+this.group, +this.page).pipe(
      takeUntil(this.destroy$),
      map((e: WordData[]) => this.checkNewWords(e))
    ).subscribe((data: WordData[]) => {
      console.log(data)
      this.wordCardData = data[0]
      this.checkedWord = data[0].word
      this.userWordData = this.wordCardData.userWord!
      this.words = data
      this.checkPageStatus()
    })

    // this.wordService.getDataForTextbookGame(0, 1).subscribe((data: WordData[]) => {
    //   this.wordCardData = data[0]
    //   this.words = data
    // })
  }

  getDifficultWords(): void {
    this.wordService.getDifficultWordData().pipe(
      takeUntil(this.destroy$)
      ).subscribe((data: WordData[]) => {
      console.log(data)
      this.wordCardData = data[0]
      this.checkedWord = data[0].word
      this.userWordData = this.wordCardData.userWord!
      this.words = data
      this.checkPageStatus()
    })
  }

  changeGroup(): void {
    this.page = '0'
    if(this.group !== 'difficult') {
      this.getNewData()
    } else {
      this.getDifficultWords()
    }
  }

  changePage(): void {
    this.getNewData()
  }

  changeWordCardData(): void {
    this.wordCardData = this.words.find(e => e.word === this.checkedWord)!
    console.log(this.wordCardData)
    this.userWordData = this.wordCardData.userWord!
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

  private checkNewWords(arr: WordData[]): WordData[] {
    if(this.isSignIn) {
      return arr.map(e => {
        if (e.userWord) {
          return e
        } else {
          e.userWord = JSON.parse(JSON.stringify(DEFAULT_CUSTOM_USER_DATA))
          return e
        }
      })
    } else {
      return arr
    }
  }

  updateUserWordData(data: WordDataForRequest): void {
    console.log(data)
    this.userWordData = data.userWordData
    this.words.find(e => e._id === data.wordId)!.userWord = data.userWordData
    console.log(this.words)
    console.log(DEFAULT_CUSTOM_USER_DATA)
    this.wordService.updateUserDataForWord(data.wordId, data.userWordData).subscribe()

    this.checkPageStatus()
    console.log(this.pageStatus)
  }

  checkPageStatus(): void {
    if (this.words.every(e => e.userWord!.optional!.rating > 5)) {
      console.log('yeeee')
      this.pageStatus[+this.page] = 'learned'
      console.log('status', this.pageStatus[+this.page])
    } else if (this.words.every(e => e.userWord!.optional!.rating < 3)) {
      this.pageStatus[+this.page] = 'difficult'
      console.log('status', this.pageStatus[+this.page])
    } else {
      this.pageStatus[+this.page] = ''
      console.log('status', this.pageStatus[+this.page])
    }
  }

  setSelectColor(): string {
    if (this.pageStatus[+this.page] === 'learned') {
      return 'primary'
    } else if (this.pageStatus[+this.page] === 'difficult') {
      return 'warn'
    } else {
      return ''
    }
  }

  getClass() {
    return STYLE_CLASSES[+this.group]
  }
}
