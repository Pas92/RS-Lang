import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { BASE_URL } from 'src/app/models/requests.model';

@Component({
  selector: 'app-word-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit {

  constructor() { }

  _wordData!: WordData
  isImgDownload: boolean = false
  imgSrc: string = '../../../assets/svg/image-placeholder.svg'

  @Input() set wordData(value: WordData) {
    this.isImgDownload = false
    this._wordData = value

    if(!!this._wordData) {
      this.imgSrc = this.baseURL + '/' + this.wordData.image
    }
  }

  get wordData() {
    return this._wordData
  }

  baseURL = BASE_URL
  audioWord: HTMLAudioElement = new Audio()
  audioExample: HTMLAudioElement = new Audio()
  audioMeaning: HTMLAudioElement = new Audio()

  playStates = {
    audioWord:  false,
    audioMeaning:  false,
    audioExample:  false
  }

  ngOnInit(): void {

  }

  hideSpinner() {
    this.isImgDownload = true
  }

  playAudio(): void {
    this.audioWord.src = `${this.baseURL}/${this.wordData.audio}`
    this.audioMeaning.src = `${this.baseURL}/${this.wordData.audioMeaning}`
    this.audioExample.src = `${this.baseURL}/${this.wordData.audioExample}`

    this.audioWord.play()
    this.playStates.audioWord = true

    this.audioWord.addEventListener('ended', () => {
      this.playStates.audioWord = false
      this.audioMeaning.play()
      this.playStates.audioMeaning = true
    })

    this.audioMeaning.addEventListener('ended', () => {
      this.playStates.audioMeaning = false
      this.audioExample.play()
      this.playStates.audioExample = true
    })

    this.audioExample.addEventListener('ended', () => {
      this.playStates.audioExample = false
    })
  }

}
