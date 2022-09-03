import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserStatisticsObject, WordData } from 'src/app/models/requests.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticHandlerService {

  constructor() {}

  private _bestGameSeries: number = -1
  private _gameSeries: number = -1
  private _trackingGame: string = ''

  _appStatistic!: UserStatisticsObject

  _appStatisticSubj: BehaviorSubject<UserStatisticsObject> = new BehaviorSubject(this._appStatistic)
  _appStatistic$: Observable<UserStatisticsObject> = this._appStatisticSubj.asObservable();

  // Use this method when game is started
  startTrackingStatistic(game: 'sprint' | 'audioChallenge'): void {
    this._trackingGame = game
    this._bestGameSeries = 0
    this._gameSeries = 0
  }

  // Use this method when game is overed
  stopTrackingStatistic(): void {
    this._trackingGame = ''
    this._bestGameSeries = -1
    this._gameSeries = -1
  }

  // Use this method in game after each answer. Also you should update word data with code below
  // let returnedObj = updateWordDataAndStatistic(wordData, isCorrectAnswer)
  // if(!!returnedObj) {
  //   this.wordService.updateUserDataForWord(wordData._id, wordData.userWord!).subscribe()
  // }
  updateWordDataAndStatistic(wordData: WordData, isCorrectAnswer: boolean): WordData | boolean {
    if (localStorage.getItem('userToken')) {
      if(isCorrectAnswer) {
        this.setDataForCorrectAnswer(wordData)
      } else {
        this.setDataForWrongAnswer(wordData)
      }

      this._appStatisticSubj.next(this._appStatistic)
      return wordData
    }
    return false
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

  private checkNewWordInAudioChallenge(wordData: WordData): void {
    if(!wordData.userWord?.optional?.isUsedInAudioChallengeGame) {
      wordData.userWord!.optional!.isUsedInAudioChallengeGame = true
      this._appStatistic.optional!.todayStatistics.newWordsTotal += 1
      this._appStatistic.optional!.todayStatistics.audioChallenge.newWords += 1
    }
  }

  incrementLearnedWordsFromTextbook(): void {
    this._appStatistic.optional!.todayStatistics.learnedWordsTotal +=1
    this._appStatisticSubj.next(this._appStatistic)
  }

  decrementLearnedWordsFromTextbook(): void {
    if (this._appStatistic.optional!.todayStatistics.learnedWordsTotal !== 0) {
      this._appStatistic.optional!.todayStatistics.learnedWordsTotal -= 1
    }
    this._appStatisticSubj.next(this._appStatistic)
  }

}
