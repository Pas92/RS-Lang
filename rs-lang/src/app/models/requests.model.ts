export const BASE_URL = 'https://rslang-pas92.herokuapp.com'

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
    isUsedInTextBook: false,
    isUsedInSprintGame: false,
    isUsedInAudioChallengeGame: false
  }
}

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

export type UserWordCustomData = {
  rating: number,
  isUsedInTextBook: boolean,
  sprintTotal: number,
  sprintErrors: number,
  isUsedInSprintGame: boolean,
  audioChallengeTotal: number,
  audioChallengeErrors: number,
  isUsedInAudioChallengeGame: boolean
}

export type UserWordData = {
  difficulty?: string;
  optional?: UserWordCustomData;
};

export type AuthWordDataResponse = {
  paginatedResults: WordData[];
  totalCount: Array<Object>
}

export type WordData = {
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
  userWord?: UserWordData
};

export type AuthData = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type UserSingIn = {
  email: string
  password: string
}

export type UserReg = {
  name: string
  email: string
  password: string
}

export type UserRegResponse = {
  id: string
  name: string
  email: string
}
