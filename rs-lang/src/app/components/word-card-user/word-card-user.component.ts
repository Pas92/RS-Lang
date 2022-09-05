import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DEFAULT_CUSTOM_USER_DATA, UserWordData, WordDataForRequest } from 'src/app/models/requests.model';

// declare let getComputedStyle: any;
@Component({
  selector: 'app-word-card-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-card-user.component.html',
  styleUrls: ['./word-card-user.component.scss']
})
export class WordCardUserComponent implements OnInit {

  constructor(private changeDetection: ChangeDetectorRef) { }

  _userData!: UserWordData
  _wordId!: string
  isLearned!: boolean
  isHard!: boolean

  primaryColor!: string
  @ViewChild('colorProvider', { read: ElementRef }) primaryProvider!: ElementRef;


  @Input() set userData(value: UserWordData) {
    this._userData = value
    this.isLearned = (this._userData.optional?.rating || 4) > 5
    this.isHard = (this._userData.optional?.rating || 4) < 3
  }

  @Input() set wordId(value: string) {
    this._wordId = value
  }

  @Output() changeDifficulty: EventEmitter<WordDataForRequest> = new EventEmitter()

  get userData(): UserWordData {
    return this._userData
  }

  get wordId() {
    return this._wordId
  }

  ngOnInit(): void {
  }

  updateWordDifficulty(wordStatus: string): void {
    console.log(wordStatus)
    if(wordStatus === 'learned') {
      this._userData.optional!.rating = 6

      this.isLearned = true
      this.isHard = false
    } else if(wordStatus === 'hard') {
      this._userData.optional!.rating = 1
      this.isLearned = false
      this.isHard = true
    }
    this.changeDetection.detectChanges()
    this.changeDifficulty.emit({
      userWordData: this._userData,
      wordId: this._wordId
    })
  }

  getPrimaryColor(): string {
    return this.primaryColor
  }

  getGaugeClass(): string {
    if(this.isLearned) {
      return 'gauge-learned'
    } else if(this.isHard) {
      return 'gauge-difficult'
    } else {
      return ''
    }
  }

}
