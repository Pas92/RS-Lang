import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WordData } from 'src/app/models/requests.model';
import { BASE_URL } from 'src/app/models/requests.model';

@Component({
  selector: 'app-word-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent implements OnInit, OnDestroy {

  constructor(private changeDetection: ChangeDetectorRef) {

  }

  _wordData!: WordData
  isImgDownload: boolean = false
  imgSrc: string = 'assets/svg/image-placeholder.svg'

  @Input() set wordData(value: WordData) {
    this.stopAudio()

    this.isImgDownload = false
    this._wordData = value

    if(!!this._wordData) {
      this.imgSrc = this.baseURL + '/' + this.wordData.image
      this.audioWord = new Audio()
      this.audioExample = new Audio()
      this.audioMeaning = new Audio()

      this.audioWord.src = `${this.baseURL}/${this.wordData.audio}`
      this.audioMeaning.src = `${this.baseURL}/${this.wordData.audioMeaning}`
      this.audioExample.src = `${this.baseURL}/${this.wordData.audioExample}`
    }
  }

  get wordData() {
    return this._wordData
  }

  baseURL = BASE_URL
  audioWord: HTMLAudioElement = new Audio()
  audioExample: HTMLAudioElement = new Audio()
  audioMeaning: HTMLAudioElement = new Audio()

  isPlayedAudioWord: boolean = false
  isPlayedAudioMeaning: boolean = false
  isPlayedAudioExample: boolean = false

  ngOnInit(): void {

  }

  stopAudio() {
    this.audioWord.removeEventListener('ended', this.playAudioMeaning)
    this.audioMeaning.removeEventListener('ended', this.playAudioExample)
    this.audioExample.removeEventListener('ended', this.stopPlayingAudioExample)

    this.audioWord.pause()
    this.audioMeaning.pause()
    this.audioExample.pause()

    this.isPlayedAudioWord = false
    this.isPlayedAudioMeaning = false
    this.isPlayedAudioExample = false
  }

  hideSpinner() {
    this.isImgDownload = true
  }

  playAudio(): void {
    this.isPlayedAudioWord = true
    this.changeDetection.detectChanges()

    this.audioWord.play()

    this.audioWord.addEventListener('ended', this.playAudioMeaning.bind(this))
    this.audioMeaning.addEventListener('ended', this.playAudioExample.bind(this))
    this.audioExample.addEventListener('ended', this.stopPlayingAudioExample.bind(this))
  }

  playAudioMeaning(): void {
    this.isPlayedAudioWord = false
    this.isPlayedAudioMeaning = true
    this.changeDetection.detectChanges()
    this.audioWord.removeEventListener('ended', this.playAudioMeaning)
    this.audioMeaning.play()
  }

  playAudioExample(): void {
    this.audioMeaning.removeEventListener('ended', this.playAudioExample)
    this.isPlayedAudioMeaning = false
    this.audioExample.play()
    this.isPlayedAudioExample = true
    this.changeDetection.detectChanges()
  }

  stopPlayingAudioExample(): void {
    this.audioExample.removeEventListener('ended', this.stopPlayingAudioExample)
    this.isPlayedAudioExample = false
    this.changeDetection.detectChanges()
  }

  ngOnDestroy(): void {
    this.stopAudio()
  }
}
