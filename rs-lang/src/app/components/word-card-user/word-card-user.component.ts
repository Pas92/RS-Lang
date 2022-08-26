import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_CUSTOM_USER_DATA, UserWordData } from 'src/app/models/requests.model';

@Component({
  selector: 'app-word-card-user',
  templateUrl: './word-card-user.component.html',
  styleUrls: ['./word-card-user.component.scss']
})
export class WordCardUserComponent implements OnInit {

  constructor() { }

  _userData!: UserWordData
  isLearned!: boolean
  isHard!: boolean
  @Input() set userData(value: UserWordData) {
    this._userData = !!value ? value : DEFAULT_CUSTOM_USER_DATA
    this.isLearned = (this._userData.optional?.rating || 4) > 5
    this.isHard = (this._userData.optional?.rating || 4) < 3
  }

  @Input() wordId!: string

  @Output() changeDifficulty: EventEmitter<Array<UserWordData | string>> = new EventEmitter()

  outputUserWordData = {

  }

  get userData(): UserWordData {
    return this._userData
  }

  ngOnInit(): void {
  }

  updateWordDifficulty(wordStatus: string): void {
    if(wordStatus = 'learned') {
      console.log(wordStatus)

      this._userData.optional!.rating = 6
    }

    if(wordStatus = 'hard') {
      this._userData.optional!.rating = 1
    }

    this.changeDifficulty.emit([this._userData, this.wordId])
  }

}
