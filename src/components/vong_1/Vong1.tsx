import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Card } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserContext, UserType } from "../../context/UserContext";
import { INIT_QUESTION } from "../../constants/constants";
import { QuestionType } from "../../types/Login";
import { useNavigate } from "react-router-dom";

const Vong1 = () => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserType[]>([]);
  const { user } = useContext(UserContext);
  const [resetTime, setRestTime] = useState<number>(0);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);

  const handleShowName = () => {
    const nameUser = listUser.find(
      (item) => item?.id === numberQuestion?.idUser
    );
    return nameUser?.fullName || "";
  };
  useEffect(() => {
    socket.emit("listUserAndScore", "admin");
    socket.on("listUserAndScoreServer", (msg: UserType[]) => {
      setListUser([...msg]);
    });
    socket.on("quesGame1Server", (msg: any) => {
      setNumberQuestion({ ...msg });
    });
    socket.on("startTimeServer", (msg: UserType[]) => {
      setRestTime((pre) => pre + 1);
    });
    socket.on("nextGroupServer1", (msg: UserType[]) => {
      navigate("/vong-group/1/user");
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
            <div className="flex justify-between items-center">
              <p className="text-white font-semibol">{`Câu hỏi ${numberQuestion.no}`}</p>
              <p className="text-white font-semibol px-10">{`Lượt thi : ${handleShowName()}`}</p>
            </div>
          }
          className="flex-1  baseColor text-white"
        >
          <p className="text-white font-semibol">{numberQuestion.ques}</p>
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

export default Vong1;
