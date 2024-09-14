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
  no: number;
  idUser: number;
  score: number;
  type?: number;
}

export interface QuestionTypeBody {
  ques: string;
  ans: string;
  no: number;
  idUser: number;
}
export interface QuestionTypeBody4 {
  id?: number;
  ques: string;
  ans: string;
  idUser: number;
  score: number;
}

export interface QuestionType2 {
  id: number;
  ques: string;
  ans: string;
  no: number;
  type: number;
  isActive: number;
}

export interface QuestionType3 {
  id: number;
  ques: string;
  ans: string;
  no: number;
  type: number;
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

export interface QuestionFourType {
  id: number;
  ques: string;
  ans: string;
  score: number;
  type: number;
  idUser: number;
}
