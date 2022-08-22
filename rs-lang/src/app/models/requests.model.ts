export const BASE_URL = 'https://rslang-pas92.herokuapp.com'

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

export type UserWordCustomData = Record<string, unknown>;

export type UserWordData = {
  difficulty: string;
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
