import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card, Input, Typography } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserContext, UserType } from "../../context/UserContext";

import { AnserDetailType, AnswerType, QuestionType3 } from "../../types/Login";

import ShowPoint from "./ShowPoint";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../Slide/SideImage";
import { INIT_QUESTION_3 } from "../CreateQuestion/Question3";

const Vong3 = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [resetTime, setRestTime] = useState({
    isPlaying: false,
    duration: 25,
  });
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState<string>("");
  const [updateTime, setUpdateTime] = useState<number>(15);
  const [listAnswer, setListAnswer] = useState<AnserDetailType[]>([]);

  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType3>(INIT_QUESTION_3);

  useEffect(() => {
    socket.on("listUserServer3", (msg: UserType[]) => {
      setListUser([...msg]);
      setListAnswer([]);
    });

    socket.on("questionServer3", (msg: QuestionType3) => {
      setNumberQuestion({ ...msg });
    });

    socket.on("startTimeServer3", (msg: number) => {
      setRestTime((pre) => ({ ...pre, isPlaying: true, duration: msg }));
    });

    socket.on("showResultServer3", (msg: AnserDetailType[]) => {
      setListAnswer([...msg]);
      setRestTime((pre) => ({ ...pre, isPlaying: false }));
    });

    socket.on("nextWaitScreenServer", (msg: string) => {
      navigate("/wait-screen");
    });
    return () => {
      socket.off("listUserServer2");
      socket.off("quesGame1Server");
    };
  }, [socket, navigate]);

  const handleSubmit = () => {
    if (user?.id) {
      const ans: AnswerType = {
        idUser: user?.id,
        ans: answer,
        updateAt: updateTime,
      };
      socket.emit("answer3", ans);
    }
  };

  return (
    <div>
      {listAnswer.length > 0 ? (
        <ShowPoint listAnswer={listAnswer} />
      ) : (
        <div className="flex gap-20 justify-center items-center p-5">
          <div className="flex-1  ">
            <div className="flex flex-col gap-2 w-[1000px]">
              <Card className="bg-sky-800 text-white">
                <Typography className="text-white text-xl">
                  {numberQuestion.ques}
                </Typography>
              </Card>

              <Card className="flex bg-sky-800 justify-center">
                <div className="w-[900px]">
                  {resetTime.isPlaying && (
                    <ImageCarousel
                      listImage={numberQuestion.image}
                      resetTime={resetTime}
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <CountdownCircleTimer
              key={resetTime.duration}
              isPlaying={resetTime.isPlaying}
              duration={resetTime.duration}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[30, 20, 10, 0]}
              onUpdate={(value) => setUpdateTime(value)}
              // onComplete={() => handleNextQuestion(resetTimer)}
            >
              {Timer}
            </CountdownCircleTimer>
            <div>
              <Input
                placeholder="Nhập câu trả lời"
                size="large"
                className="p-8 flex-1 text-2xl"
                onChange={(e) => setAnswer(e?.target?.value)}
              />
              <Button onClick={handleSubmit}>Gửi câu trả lời</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vong3;
