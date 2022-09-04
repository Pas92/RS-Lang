import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { DEFAULT_CUSTOM_USER_DATA, UserSettingsObject, UserWordData, WordData, WordDataForRequest } from 'src/app/models/requests.model';
import { AuthService } from 'src/app/services/requests/auth.service';
import { UserSettingsService } from 'src/app/services/requests/user-settings.service';
import { StatisticHandlerService } from 'src/app/services/data-handlers/statistic-handler.service';
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

  constructor(private wordService: WordsService, private settingsProvider: UserSettingsService, private statistics: StatisticHandlerService) { }

  group = '0'
  page = '0'

  isImgDownload: boolean = false

  words: WordData[] = []

  private _userSettings!: UserSettingsObject

  pageStatus: string[] = new Array(30)
  checkedWord: string = ''
  wordCardData!: WordData
  userWordData!: UserWordData
  isSignIn: boolean = false

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {

    this.group = localStorage?.getItem('group') || '0'
    this.page = localStorage?.getItem('page') || '0'
    this.pageStatus.fill('')
    this.isSignIn = !!localStorage.getItem('userToken')

    this.getNewData()
    if (this.isSignIn) {
      this.getUserSettings()
    }
  }

  getUserSettings(): void {
    this.settingsProvider.getSettings().subscribe(data => {
      if(typeof data !== 'number') {
        this._userSettings = data as UserSettingsObject
        this.pageStatus = data.optional.pages[+this.group] as string[]
      }
    })
  }

  getNewData(): void {
    this.wordService.getData(+this.group, +this.page).pipe(
      takeUntil(this.destroy$),
      map((e: WordData[]) => this.checkNewWords(e))
    ).subscribe((data: WordData[]) => {
      this.wordCardData = data[0]
      this.checkedWord = data[0].word
      this.words = data
      if(this.isSignIn) {
        this.checkPageStatus()
        this.userWordData = this.wordCardData.userWord!
      }

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
    this.userWordData = this.wordCardData.userWord!
    this.isImgDownload = false
  }

  hideSpinner(): void {
    this.isImgDownload = true
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
    this.userWordData = data.userWordData
    this.words.find(e => e._id === data.wordId)!.userWord = data.userWordData
    this.wordService.updateUserDataForWord(data.wordId, data.userWordData).subscribe()

    this.checkPageStatus()
  }

  checkPageStatus(): void {
    const pageStatusAsString = JSON.stringify(this.pageStatus)
    if (this.words.every(e => e.userWord!.optional!.rating > 5)) {
      this.pageStatus[+this.page] = 'learned'
    } else if (this.words.every(e => e.userWord!.optional!.rating < 3)) {
      this.pageStatus[+this.page] = 'difficult'
    } else {
      this.pageStatus[+this.page] = ''
    }

    const modifyPageStatusAsString = JSON.stringify(this.pageStatus)


    if ((pageStatusAsString !== modifyPageStatusAsString) && this._userSettings) {
      this._userSettings.optional.pages[+this.group] = this.pageStatus
      this.settingsProvider.setSetting(this._userSettings).subscribe()
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

  getClass(): string {
    return STYLE_CLASSES[+this.group]
  }

  getPageClass(): string {
    if (this.pageStatus[+this.page] === 'learned') {
      return 'learned-page'
    } else if (this.pageStatus[+this.page] === 'difficult') {
      return 'difficult-page'
    } else {
      return ''
    }
  }
}
