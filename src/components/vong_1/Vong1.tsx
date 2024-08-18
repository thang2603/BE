import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Card } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserType } from "../../context/UserContext";
import { INIT_QUESTION } from "../../constants/constants";
import { QuestionType } from "../../types/Login";

const Vong1 = () => {
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserType[]>([]);
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
    return () => {
      socket.off("listUserServer");
    };
  }, [socket]);
  return (
    <div className="flex flex-col justify-end gap-8 h-screen p-10">
      <CountdownCircleTimer
        key={`${numberQuestion?.idUser}_${numberQuestion?.no}`}
        isPlaying={!!numberQuestion.id}
        duration={10}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        // onComplete={() => handleNextQuestion(resetTimer)}
      >
        {Timer}
      </CountdownCircleTimer>
      <div className="flex  gap-6 min-w-[1000px]">
        <Card title={`Câu hỏi ${numberQuestion.no}`} className="flex-1">
          <p>{numberQuestion.ques}</p>
        </Card>
        <div className="min-w-96 flex flex-col gap-2">
          {listUser.map((item) => (
            <div
              style={
                item.id === numberQuestion.idUser
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

export default Vong1;
