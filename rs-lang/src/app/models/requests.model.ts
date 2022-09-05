import * as moment from "moment"

export const BASE_URL = 'https://rslang-pas92.herokuapp.com';

//Word rating = 0..2 - userWord is difficult
//Word rating = 3..5 - userWord is normal
//Word rating = 6..8 - userWord is learned

//isUsedInTextBook: false - userWord is new in Textbook
//isUsedInSprintGame: false - userWord is new in Textbook
//isUsedInAudioChallengeGame: false - userWord is new in Textbook

export const DEFAULT_CUSTOM_USER_DATA: UserWordData = {
  difficulty: 'normal',
  optional: {
    rating: 4,
    sprintTotal: 0,
    sprintErrors: 0,
    audioChallengeTotal: 0,
    audioChallengeErrors: 0,
    isUsedInSprintGame: false,
    isUsedInAudioChallengeGame: false
  }
}

export const DEFAULT_DAILY_GAME_STATISTIC: GameStatistic = {
  newWords: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  bestSeries: 0
}

export const DEFAULT_DAILY_STATISTIC: DailyStatistic = {
  date: moment().format('DD-MM-YYYY'),
  audioChallenge: JSON.parse(JSON.stringify(DEFAULT_DAILY_GAME_STATISTIC)),
  sprint: JSON.parse(JSON.stringify(DEFAULT_DAILY_GAME_STATISTIC)),
  newWordsTotal: 0,
  learnedWordsTotal: 0,
  correctAnswersTotal: 0,
  wrongAnswersTotal: 0
}

export const DEFAULT_USER_FULL_STATISTIC: UserFullStatistics = {
  date: moment().format('DD-MM-YYYY'),
  todayStatistics: JSON.parse(JSON.stringify(DEFAULT_DAILY_STATISTIC)),
  fullStatistics: []
}

export const MIN_WORDS_FOR_GAME = 20

export enum ENDPOINTS {
  words = 'words',
  users = 'users',
  signin = 'signin'
}

export enum WORD_DIFFICULTY {
  learned = 'learned',
  hard = 'hard',
  normal = 'normal',
}

export interface UserWordCustomData {
  rating: number,
  sprintTotal: number,
  sprintErrors: number,
  isUsedInSprintGame: boolean,
  audioChallengeTotal: number,
  audioChallengeErrors: number,
  isUsedInAudioChallengeGame: boolean
}

export interface UserWordData {
  difficulty?: string;
  optional?: UserWordCustomData;
};

export interface WordDataForRequest {
  userWordData: UserWordData;
  wordId: string;
}

export interface AuthWordDataResponse {
  paginatedResults: WordData[];
  totalCount: Array<Object>
}

export interface WordData {
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: UserWordData;
};

export interface UserWordDataForStatistic {
  _id: string;
  userWord: UserWordData;
}

export interface GameResult {
  word: string
  audio?: string
  wordTranslate: string
  correct: boolean
  score?: number
};

export interface AuthData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export interface UserSingIn {
  email: string
  password: string
}

export interface UserReg extends UserSingIn {
  name: string
}

export interface UserRegResponse {
  id: string
  name: string
  email: string
}

export interface GameStatistic {
  newWords: number
  correctAnswers: number
  wrongAnswers: number
  bestSeries: number
}

export interface DailyStatistic {
  date: string
  audioChallenge: GameStatistic
  sprint: GameStatistic
  newWordsTotal: number
  learnedWordsTotal: number
  correctAnswersTotal: number
  wrongAnswersTotal: number
}

export interface UserFullStatistics {
  date: string
  todayStatistics: DailyStatistic
  fullStatistics: DailyStatistic[]
}

export interface SendingUserFullStatistics {
  date: string
  todayStatistics: string
  fullStatistics: string
}

export interface UserStatisticsObject {
  learnedWords?: number
  optional?: UserFullStatistics
  _id?: string
}

export interface SendingUserStatisticsObject {
  learnedWords?: number
  optional: SendingUserFullStatistics
  _id?: string
}

export interface UserSettingsObject {
  wordsPerDay?: number
  optional: UserSettings
  _id?: string
}

export interface SendingUserSettingsObject {
  wordsPerDay?: number
  optional: SendingUserSettings
  _id?: string
}

export interface UserSettings {
  pages: Array<string[]>
}

export interface SendingUserSettings {
  pages: string
}

export const DEFAULT_USER_FULL_SETTINGS: UserSettings = {
  pages: new Array<string[]>(6).fill(new Array<string>(30).fill(''))
}
