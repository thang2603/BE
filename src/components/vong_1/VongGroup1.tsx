import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserType } from "../../context/UserContext";
import { INIT_QUESTION } from "../../constants/constants";
import { QuestionType } from "../../types/Login";
import { UserContext } from "./../../context/UserContext";
import { useNavigate } from "react-router-dom";

const VongGroup1 = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
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
    socket.emit("listUserAndScore", "admin");
    socket.on("listUserAndScoreServer", (msg: UserType[]) => {
      setListUser([...msg]);
    });

    socket.on("questionGroupServer", (msg: any) => {
      setNumberQuestion({ ...msg });
    });

    socket.on("startTimeServer", (msg: UserType[]) => {
      setIdPress(0);
      setRestTime((pre) => pre + 1);
    });

    socket.on("pressRung1Server", (msg: number) => {
      setIdPress(msg);
    });

    socket.on("nextWaitScreenServer", (msg: string) => {
      navigate("/wait-screen");
    });
    return () => {
      socket.off();
    };
  }, [socket, navigate]);

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
        {user?.role === "USER" && (
          <Button
            disabled={handleCheckDisable()}
            onClick={() => hanlePressRung(user.id)}
          >
            Chuông
          </Button>
        )}
      </div>
      <div className="flex  gap-6 min-w-[1000px]">
        <Card
          title={
            <span className="text-white font-semibol">{`Câu hỏi ${numberQuestion.no}`}</span>
          }
          className="flex-1 baseColor"
        >
          <p className="text-white font-semibold">{numberQuestion.ques}</p>
        </Card>
        <div className="min-w-96 flex flex-col gap-2 text-white">
          {listUser.map((item) => (
            <div
              key={item.id}
              style={
                item.id === idPress
                  ? {
                      backgroundColor: "red",
                      color: "#ffffff",
                    }
                  : {}
              }
              className="flex gap-2 items-center justify-between baseColor text-white rounded-md p-2"
            >
              <p className="font-semibold">{item.fullName}</p>
              <p className="w-7 font-semibold">{item?.score}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        {user?.role === "MC" && (
          <Card title="Đáp án">
            <p className="min-h-9">{numberQuestion.ans}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VongGroup1;
