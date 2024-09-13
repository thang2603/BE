import { useContext, useEffect, useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card, Image, Input, Typography } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserContext, UserType } from "../../context/UserContext";
import {
  INIT_QUESTION,
  listImageGame3,
  listVideo,
} from "../../constants/constants";
import { AnserDetailType, AnswerType, QuestionType } from "../../types/Login";

import ShowPoint from "./ShowPoint";
import { useNavigate } from "react-router-dom";

const Vong3 = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [resetTime, setRestTime] = useState<number>(0);
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState<string>("");
  const [updateTime, setUpdateTime] = useState<number>(15);
  const [listAnswer, setListAnswer] = useState<AnserDetailType[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);

  useEffect(() => {
    socket.on("listUserServer3", (msg: UserType[]) => {
      console.log(msg);
      setListUser([...msg]);
      setListAnswer([]);
    });

    socket.on("questionServer3", (msg: QuestionType) => {
      console.log(msg);
      setNumberQuestion({ ...msg });
    });

    socket.on("startTimeServer3", (msg: UserType[]) => {
      console.log(msg);
      setRestTime((pre) => pre + 1);
      handlePlay();
    });

    socket.on("showResultServer3", (msg: AnserDetailType[]) => {
      setListAnswer([...msg]);
      setRestTime(0);
    });

    socket.on("nextServer4", (msg: string) => {
      navigate("/vong/4/user");
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

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Function to pause the video
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  return (
    <div>
      {listAnswer.length > 0 ? (
        <ShowPoint listAnswer={listAnswer} />
      ) : (
        <div className="flex gap-20 justify-center items-center p-5">
          <div className="flex-1 max-w-[800px] min-w-[700px] ">
            <div className="flex flex-col gap-2">
              <Card className="bg-sky-800 text-white">
                <Typography className="text-white text-xl">
                  {numberQuestion.ques}
                </Typography>
              </Card>
              <Card className="bg-sky-800 text-white flex justify-center items-center">
                {numberQuestion?.type === 1 ? (
                  <Image
                    src={listImageGame3[numberQuestion.no - 1]?.url}
                    width={600}
                    height={400}
                  />
                ) : (
                  <video width={600} height={400} controls ref={videoRef}>
                    <source src={listVideo[0].url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <CountdownCircleTimer
              key={resetTime}
              isPlaying={!!resetTime}
              duration={15}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[15, 10, 5, 0]}
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
