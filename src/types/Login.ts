import { UserType } from "../context/UserContext";

export interface LoginType {
  userName: string;
  passWord: string;
}

export interface QuestionType {
  id: number;
  ques: string;
  ans: string;
  quantity: number;
  game: number;
  no: number;
  idUser: number;
  score: number;
  type?: number;
}

export interface QuestionType2 {
  id: number;
  ques: string;
  ans: string;
  no: number;
  type: number;
  isActive: number;
}
export interface NumberQuestionType {
  idUser: number;
  noQues: number;
}

export interface UpdateScoreType {
  idUser: number;
  score: number;
}

export interface AnswerType {
  idUser: number;
  ans: string;
  updateAt?: string | number;
}

export interface AnserDetailType extends UserType {
  ans: string;
  updateAt?: number;
}
