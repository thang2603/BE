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
}

export interface NumberQuestionType {
  idUser: number;
  noQues: number;
}

export interface UpdateScoreType {
  idUser: number;
  score: number;
}
