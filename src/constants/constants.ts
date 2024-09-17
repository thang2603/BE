import {
  QuestionFourType,
  QuestionType,
  QuestionType2,
  QuestionTypeBody,
  QuestionTypeBody4,
} from "../types/Login";
import image1 from "../assets/vong3/cau1.png";
import image2 from "../assets/vong3/cau2.png";
import image3 from "../assets/vong3/cau3.png";
import image4 from "../assets/vong3/cau4.png";
import video from "../assets/vong3/video.mp4";
export const INIT_QUESTION: QuestionType = {
  id: 0,
  ques: "",
  ans: "",
  quantity: 0,
  no: 0,
  idUser: 0,
  score: 0,
  type: 0,
};
export const INIT_QUESTION_2: QuestionType2 = {
  id: 0,
  ques: "",
  ans: "",
  no: 0,
  type: 0,
  isActive: 0,
  link: "",
};
export const INIT_QUESTION_BODY: QuestionTypeBody = {
  ques: "",
  ans: "",
  no: 1,
  idUser: 0,
};
export const INIT_QUESTION_BODY_4: QuestionTypeBody4 = {
  ques: "",
  ans: "",
  idUser: 0,
  score: 20,
};

export const INIT_SCORE_4 = [
  {
    value: 20,
    label: "Gói 20 điểm",
  },
  {
    value: 30,
    label: "Gói 30 điểm",
  },
];
export const listImageGame3 = [
  {
    id: 1,
    url: image1,
  },
  {
    id: 2,
    url: image2,
  },
  {
    id: 3,
    url: image3,
  },
  {
    id: 4,
    url: image4,
  },
];

export const listVideo = [
  {
    id: 5,
    url: video,
  },
];

export const INIT_QUESTION_FOUR: QuestionFourType = {
  id: 0,
  ques: "",
  ans: "",
  idUser: 0,
  score: 0,
  type: 0,
};
