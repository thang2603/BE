import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserType } from "../../context/UserContext";
import { INIT_QUESTION } from "../../constants/constants";
import { QuestionType } from "../../types/Login";
import { UserContext } from "./../../context/UserContext";

const VongGroup1 = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [resetTime, setRestTime] = useState<number>(0);
  const [idPress, setIdPress] = useState<number>(0);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);

  const hanlePressRung = (idUser: number) => {
    socket.emit(`pressRung1`, idUser);
  };

  const handleCheckDisable = () => {
    if (idPress === 0) return false;
    if (idPress === user?.id) return false;
    return true;
  };

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
      setIdPress(0);
      setRestTime((pre) => pre + 1);
    });
    socket.on("pressRung1Server", (msg: number) => {
      setIdPress(msg);
    });
    return () => {
      socket.off("listUserServer");
      socket.off("quesGame1Server");
    };
  }, [socket]);

  return (
    <div className="flex flex-col justify-end gap-8 h-screen p-10">
      <div className=" flex justify-between items-center">
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
        <Button
          disabled={handleCheckDisable()}
          onClick={() => hanlePressRung(user.id)}
        >
          Chuông
        </Button>
      </div>
      <div className="flex  gap-6 min-w-[1000px]">
        <Card title={`Câu hỏi ${numberQuestion.id}`} className="flex-1">
          <p>{numberQuestion.ques}</p>
        </Card>
        <div className="min-w-96 flex flex-col gap-2">
          {listUser.map((item) => (
            <div
              style={
                item.id === idPress
                  ? {
                      backgroundColor: "red",
                      color: "#ffffff",
                    }
                  : {}
              }
              className="flex gap-2 items-center justify-between bg-white rounded-md p-2"
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

export default VongGroup1;
