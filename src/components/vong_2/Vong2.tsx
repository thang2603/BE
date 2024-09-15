import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card, Input } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserContext, UserType } from "../../context/UserContext";
import { INIT_QUESTION } from "../../constants/constants";
import {
  AnserDetailType,
  AnswerType,
  QuestionType,
  QuestionType2,
} from "../../types/Login";
import ImageMagic from "./ImageMagic";
import RowWord from "./RowWord";
import ShowPoint from "./ShowPoint";
import { useNavigate } from "react-router-dom";

const Vong2 = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [resetTime, setRestTime] = useState<number>(0);
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState<string>("");
  const [updateTime, setUpdteTime] = useState<number>(15);
  const [listAnswer, setListAnswer] = useState<AnserDetailType[]>([]);
  const [listQuestion, setListQuestion] = useState<QuestionType2[]>([]);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);

  useEffect(() => {
    socket.on("listUserServer2", (msg: UserType[]) => {
      console.log(msg);
      setListUser([...msg]);
      setListAnswer([]);
    });
    socket.on("listQuestionServer2", (msg: QuestionType2[]) => {
      setListQuestion([...msg]);
    });
    socket.on("questionServer2", (msg: QuestionType) => {
      console.log(msg);
      setNumberQuestion({ ...msg });
    });

    socket.on("startTimeServer2", (msg: UserType[]) => {
      console.log(msg);
      setRestTime((pre) => pre + 1);
    });

    socket.on("showResultServer2", (msg: AnserDetailType[]) => {
      setListAnswer([...msg]);
      setRestTime(0);
    });

    socket.on("showResultServer2", (msg: AnserDetailType[]) => {
      setListAnswer([...msg]);
    });

    socket.on("nextServer3", (msg: AnserDetailType[]) => {
      navigate("/vong/3/user");
    });

    return () => {
      socket.off("listUserServer2");
      socket.off("quesGame1Server");
    };
  }, [socket, navigate]);

  const handleSubmit = () => {
    if (user?.id) {
      const ans: AnswerType = { idUser: user?.id, ans: answer };
      socket.emit("answer2", ans);
    }
  };
  return (
    <div>
      {listAnswer?.length > 0 ? (
        <ShowPoint listAnswer={listAnswer} />
      ) : (
        <div className="flex flex-col justify-between gap-8 h-screen p-10">
          <div className="flex gap-10">
            <ImageMagic listQuestion={listQuestion} />
            <RowWord listQuestion={listQuestion} />
          </div>
          <div className="flex flex-col gap-4 ">
            <div className=" flex justify-end">
              <CountdownCircleTimer
                key={resetTime}
                isPlaying={!!resetTime}
                duration={15}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[15, 10, 5, 0]}
                onUpdate={(value) => setUpdteTime(value)}
                // onComplete={() => handleNextQuestion(resetTimer)}
              >
                {Timer}
              </CountdownCircleTimer>
              {user?.role === "MC" && (
                <div>
                  <p className="min-h-9">Đáp án : {numberQuestion.ans}</p>
                </div>
              )}
            </div>
            <div className="flex  gap-6 min-w-[1000px]">
              <Card
                title={
                  <p className="text-white">{`Câu hỏi ${numberQuestion.no}`}</p>
                }
                className="flex-1 bg-sky-800 "
              >
                <p className="text-white font-semibold">
                  {numberQuestion.ques}
                </p>
              </Card>
              <div className="min-w-96 flex flex-col gap-2">
                {listUser.map((item) => (
                  <div
                    key={item?.id}
                    style={
                      item.id === numberQuestion.idUser
                        ? {
                            backgroundColor: "red",
                            color: "#ffffff",
                          }
                        : {}
                    }
                    className="flex gap-2 items-center justify-between bg-sky-800 text-white rounded-md p-2"
                  >
                    <p className="font-semibold">{item.fullName}</p>
                    <p className="w-7 font-semibold">{item?.score}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-10">
              <Input onChange={(e) => setAnswer(e.target.value)}></Input>
              <Button
                disabled={!updateTime}
                onClick={handleSubmit}
                className="w-[450px]"
              >
                Gửi câu trả lời
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vong2;
