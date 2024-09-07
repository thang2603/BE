import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Card } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserType } from "../../context/UserContext";
import { INIT_QUESTION } from "../../constants/constants";
import { QuestionType } from "../../types/Login";
import { useNavigate } from "react-router-dom";

const Vong1 = () => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [resetTime, setRestTime] = useState<number>(0);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);

  useEffect(() => {
    socket.on("listUserServer", (msg: UserType[]) => {
      console.log(msg);
      setListUser([...msg]);
    });
    socket.on("quesGame1Server", (msg: any) => {
      setNumberQuestion({ ...msg });
    });
    socket.on("startTimeServer", (msg: UserType[]) => {
      console.log(msg);
      setRestTime((pre) => pre + 1);
    });
    socket.on("nextGroupServer1", (msg: UserType[]) => {
      navigate("/vong-group/1/user");
    });
    return () => {
      socket.off("listUserServer");
      socket.off("quesGame1Server");
    };
  }, [socket, navigate]);

  return (
    <div className="flex flex-col justify-end gap-8 h-screen p-10">
      <CountdownCircleTimer
        key={resetTime}
        isPlaying={!!resetTime}
        duration={5}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        // onComplete={() => handleNextQuestion(resetTimer)}
      >
        {Timer}
      </CountdownCircleTimer>
      <div className="flex  gap-6 min-w-[1000px]">
        <Card
          // title={`Câu hỏi ${numberQuestion.no}`}
          title={
            <span className="text-white font-semibol">{`Câu hỏi ${numberQuestion.no}`}</span>
          }
          className="flex-1 bg-sky-800 text-white"
        >
          <p className="text-white">{numberQuestion.ques}</p>
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
      <div>
        <Card title="Đáp án">
          <p className="min-h-9">{numberQuestion.ans}</p>
        </Card>
      </div>
    </div>
  );
};

export default Vong1;
