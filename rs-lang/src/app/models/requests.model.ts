export const BASE_URL = 'https://rslang-pas92.herokuapp.com'

export enum ENDPOINTS {
  words = 'words',
  users = 'users',
  signin = 'signin'
}

export type UserWordCustomData = Record<string, unknown>;

export type UserWord = {
  difficulty: string;
  optional: UserWordCustomData;
};

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
  userWord?: UserWord
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
