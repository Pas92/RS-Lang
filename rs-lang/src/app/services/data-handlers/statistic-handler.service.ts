import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DailyStatistic, DEFAULT_DAILY_STATISTIC, UserStatisticsObject, WordData } from 'src/app/models/requests.model';
import { AuthService } from '../requests/auth.service';
import { StatisticService } from '../requests/statistic.service';
import { WordsService } from '../requests/words.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticHandlerService {

  constructor(
    private statisticProvider: StatisticService,
    private authService: AuthService,
    private wordService: WordsService) {

    console.log('constructor')
    this.authService.isSignIn$.subscribe(data => {
      this._isSignIn = data
    })
    if (this._isSignIn) {
      this.setAppStatistic()
    }

    this._appStatistic$.subscribe(data => {
      if(data) {
        console.log(this._appStatistic.optional?.date)
        this.checkTodayStatistic()
      }
    })
  }

  private _bestGameSeries: number = -1
  private _gameSeries: number = -1
  private _trackingGame: string = ''

  private _isSignIn: boolean = false

  private _appStatistic!: UserStatisticsObject

  get appStatistic$(): Observable<UserStatisticsObject> {
    return this._appStatistic$
  }

  private _appStatisticSubj: BehaviorSubject<UserStatisticsObject> = new BehaviorSubject(this._appStatistic)
  private _appStatistic$: Observable<UserStatisticsObject> = this._appStatisticSubj.asObservable();

  setAppStatistic(): void {
    this.statisticProvider.getStatistics().subscribe((data) => {
      if (typeof data !== 'number') {
        data.optional!.todayStatistics = JSON.parse((data.optional!.todayStatistics as string))
        data.optional!.fullStatistics = JSON.parse(data.optional!.fullStatistics as string)

        this._appStatistic = data as UserStatisticsObject
        this._appStatisticSubj.next(this._appStatistic)
      }
    })
  }

  private checkTodayStatistic(): void {
    const today: string = moment().format('DD-MM-YYYY')
    if(today !== this._appStatistic.optional?.date) {
      this._appStatistic.optional?.fullStatistics.push(this._appStatistic.optional?.todayStatistics)
      console.log('handler')
      this._appStatistic.optional!.todayStatistics = JSON.parse(JSON.stringify(DEFAULT_DAILY_STATISTIC)) as DailyStatistic
      this._appStatistic.optional!.date = today
      this.statisticProvider.setStatistic(this._appStatistic).subscribe(_ => {
        this._appStatisticSubj.next(this._appStatistic)
      })
    }
  }

  startTrackingStatistic(game: 'sprint' | 'audioChallenge'): void {
    this._trackingGame = game
    this._bestGameSeries = 0
    this._gameSeries = 0
  }

  stopTrackingStatistic(): void {
    this._trackingGame = ''
    this._bestGameSeries = -1
    this._gameSeries = -1
  }

  // Use this method in game after each answer
  updateWordDataAndStatistic(wordData: WordData, isCorrectAnswer: boolean): void {
    if(this._isSignIn) {
      if(isCorrectAnswer) {
        this.setDataForCorrectAnswer(wordData)
      } else {
        this.setDataForWrongAnswer(wordData)
      }

      //TODO: Send word data and statistic
      this.statisticProvider.setStatistic(this._appStatistic).subscribe()
      this.wordService.updateUserDataForWord(wordData._id, wordData.userWord!).subscribe()
      this._appStatisticSubj.next(this._appStatistic)
    }
  }

  private setDataForCorrectAnswer(wordData: WordData): void {
    if(wordData.userWord?.optional?.rating === 5) {
      this._appStatistic.optional!.todayStatistics.learnedWordsTotal +=1
    }
    this._appStatistic.optional!.todayStatistics.correctAnswersTotal += 1
    wordData.userWord!.optional!.rating = wordData.userWord?.optional?.rating === 8 ? 8 : wordData.userWord!.optional!.rating + 1

    this._gameSeries += 1
    this._bestGameSeries = Math.max(this._gameSeries, this._bestGameSeries)

    if(this._trackingGame = 'sprint') {
      this.setDataForCorrectAnswerInSprint(wordData)
    }

    if(this._trackingGame = 'audioChallenge') {
      this.setDataForCorrectAnswerInAudioChallenge(wordData)
    }
  }

  private setDataForCorrectAnswerInSprint(wordData: WordData): void {
    this.checkNewWordInSprint(wordData)

    this._appStatistic.optional!.todayStatistics.sprint.correctAnswers +=1
    wordData.userWord!.optional!.sprintTotal += 1

    this._appStatistic.optional!.todayStatistics.sprint.bestSeries = this._bestGameSeries
  }

  private setDataForCorrectAnswerInAudioChallenge(wordData: WordData): void {
    this.checkNewWordInAudioChallenge(wordData)

    this._appStatistic.optional!.todayStatistics.audioChallenge.correctAnswers +=1
    wordData.userWord!.optional!.audioChallengeTotal += 1

    this._appStatistic.optional!.todayStatistics.audioChallenge.bestSeries = this._bestGameSeries
  }

  private setDataForWrongAnswer(wordData: WordData): void {
    if(wordData.userWord?.optional?.rating === 6) {
      this._appStatistic.optional!.todayStatistics.learnedWordsTotal -=1
    }
    this._appStatistic.optional!.todayStatistics.wrongAnswersTotal += 1
    wordData.userWord!.optional!.rating = wordData.userWord?.optional?.rating === 0 ? 0 : wordData.userWord!.optional!.rating - 1

    this._gameSeries = 0

    if(this._trackingGame = 'sprint') {
      this.setDataForWrongAnswerInSprint(wordData)
    }

    if(this._trackingGame = 'audioChallenge') {
      this.setDataForWrongAnswerInAudioChallenge(wordData)
    }
  }

  private setDataForWrongAnswerInSprint(wordData: WordData): void {
    this.checkNewWordInSprint(wordData)

    this._appStatistic.optional!.todayStatistics.sprint.wrongAnswers +=1
    wordData.userWord!.optional!.sprintTotal += 1
    wordData.userWord!.optional!.sprintErrors += 1
  }

  private setDataForWrongAnswerInAudioChallenge(wordData: WordData): void {
    this.checkNewWordInAudioChallenge(wordData)

    this._appStatistic.optional!.todayStatistics.audioChallenge.wrongAnswers +=1
    wordData.userWord!.optional!.audioChallengeTotal += 1
    wordData.userWord!.optional!.audioChallengeErrors += 1
  }

  private checkNewWordInSprint(wordData: WordData): void {
    if(!wordData.userWord?.optional?.isUsedInSprintGame) {
      wordData.userWord!.optional!.isUsedInSprintGame = true
      this._appStatistic.optional!.todayStatistics.newWordsTotal += 1
      this._appStatistic.optional!.todayStatistics.sprint.newWords += 1
    }
  }

  private checkNewWordInAudioChallenge(wordData: WordData) {
    if(!wordData.userWord?.optional?.isUsedInAudioChallengeGame) {
      wordData.userWord!.optional!.isUsedInAudioChallengeGame = true
      this._appStatistic.optional!.todayStatistics.newWordsTotal += 1
      this._appStatistic.optional!.todayStatistics.audioChallenge.newWords += 1
    }
  }

  incrementLearnedWordsFromTextbook(): void {
    this._appStatistic.optional!.todayStatistics.learnedWordsTotal +=1
  }

  decrementLearnedWordsFromTextbook(): void {
    this._appStatistic.optional!.todayStatistics.learnedWordsTotal -=1
  }

}
