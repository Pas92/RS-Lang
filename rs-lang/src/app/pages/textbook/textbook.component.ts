import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { DEFAULT_CUSTOM_USER_DATA, UserSettingsObject, UserWordData, WordData, WordDataForRequest } from 'src/app/models/requests.model';
import { UserSettingsService } from 'src/app/services/requests/user-settings.service';
import { StatisticHandlerService } from 'src/app/services/data-handlers/statistic-handler.service';
import { WordsService } from 'src/app/services/requests/words.service';
import { MediaMatcher } from '@angular/cdk/layout';

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

  constructor(private wordService: WordsService,
    private settingsProvider: UserSettingsService,
    private statistics: StatisticHandlerService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 685px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }
  private _mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;

  group = '0'
  page = '0'

  isImgDownload: boolean = false

  words: WordData[] = []
  private cache: WordData[] = []

  private _userSettings!: UserSettingsObject

  pageStatus: string[] = new Array(30)
  checkedWord: string = ''
  wordCardData!: WordData
  userWordData!: UserWordData
  isSignIn: boolean = false
  searchPattern: string =''

  destroy$: Subject<boolean> = new Subject<boolean>();
  searchPatternUpdate: Subject<string> = new Subject<string>()

  ngOnInit(): void {
    this.destroy$.next(false);

    this.group = localStorage?.getItem('textbook-group') || '0'
    this.page = localStorage?.getItem('textbook-page') || '0'
    this.pageStatus.fill('')
    this.isSignIn = !!localStorage.getItem('userToken')

    if (this.isSignIn) {
      if(this.group === 'difficult') {
        this.getDifficultWords()
      } else {
        this.getNewData()
        this.getUserSettings()
      }
    } else {
      if(this.group === 'difficult') {
        this.group = '0'
        localStorage.setItem('textbook-group', this.group)
      }
      this.getNewData()
    }

    this.searchPatternUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$))
      .subscribe((value: string) => {
        this.searchPattern = value.trim()
        if (!this.cache.length) {
          this.cache = [...this.words]
          this.words = []
        }

        if(value.length > 2) {

          this.getWordsByPattern(value)
        } else if(value.length === 0) {
          this.words = [...this.cache]
          this.wordCardData = this.words[0]
          this.checkedWord = this.words[0].word
          this.userWordData = this.wordCardData.userWord!
          this.cache = []
        }
      });

  }

  getUserSettings(): void {
    this.settingsProvider.getSettings().pipe(takeUntil(this.destroy$)).subscribe(data => {
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
  }

  getDifficultWords(): void {
    this.wordService.getDifficultWordData().pipe(
      takeUntil(this.destroy$)
      ).subscribe((data: WordData[]) => {
        if(data.length && typeof data !== 'number') {
          this.wordCardData = data[0]
          this.checkedWord = data[0].word
          this.userWordData = this.wordCardData.userWord!
          this.words = data
          this.checkPageStatus()
        } else {
          this.words = []
        }
    })
  }

  getWordsByPattern(pattern: string): void {
    this.wordService.getWordDataWithSearchPattern(pattern).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if(data.length) {
        this.wordCardData = data[0]
        this.checkedWord = data[0].word
        this.words = data
        this.userWordData = this.wordCardData.userWord!
      } else {
        this.words = []
      }
    })
  }

  changeGroup(): void {
    if (!this.pageStatus) {
      this.pageStatus = new Array(30)
      this.pageStatus.fill('')
    }
    this.page = '0'
    localStorage.setItem('textbook-group', this.group)
    localStorage.setItem('textbook-page', this.page)
    if(this.group !== 'difficult') {
      this.getNewData()
    } else {
      this.getDifficultWords()
    }
  }

  changePage(): void {
    localStorage.setItem('textbook-page', this.page)
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
    this.wordService.updateUserDataForWord(data.wordId, data.userWordData).pipe(takeUntil(this.destroy$)).subscribe()
    if(data.userWordData.optional!.rating > 5) {
      this.statistics.incrementLearnedWordsFromTextbook()

      if (this.group === 'difficult') {
        this.words = this.words.filter(e => e._id !== data.wordId)
        this.wordCardData = this.words[0]
        this.userWordData = this.wordCardData.userWord!
        this.checkedWord = this.wordCardData.word
      }
    } else if (data.userWordData.optional!.rating < 3) {
      this.statistics.decrementLearnedWordsFromTextbook()
    } else if (this.group === 'difficult') {
        this.words = this.words.filter(e => e._id !== data.wordId)
        this.wordCardData = this.words[0]
        this.userWordData = this.wordCardData.userWord!
        this.checkedWord = this.wordCardData.word
      }

    this.checkPageStatus()
  }

  checkPageStatus(): void {
    if (this.group === 'difficult') {
      return
    }
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
      this.settingsProvider.setSetting(this._userSettings).pipe(takeUntil(this.destroy$)).subscribe()
    }
  }

  setSelectColor(): string {
    if (this.group !== 'difficult') {
      if (this.pageStatus[+this.page] === 'learned') {
        return 'primary'
      } else if (this.pageStatus[+this.page] === 'difficult') {
        return 'warn'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  getClass(): string {
    if(this.searchPattern) {
      return 'search-mode'
    }
    return this.group !== 'difficult' ? STYLE_CLASSES[+this.group] : 'difficult-page'
  }

  getPageClass(): string {
    if(this.group !== 'difficult') {
      if (this.pageStatus[+this.page] === 'learned') {
        return 'learned-page'
      } else if (this.pageStatus[+this.page] === 'difficult') {
        return 'difficult-page'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  clearSearch(): void {
    this.searchPatternUpdate.next('')
  }

  getButtonWord(word: WordData): string {
    if(this.searchPattern) {
      return this.searchPattern.match(/[a-zA-Z]/) ? word.word : word.wordTranslate
    } else {
      return word.word
    }
  }
}
