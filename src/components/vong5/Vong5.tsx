import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserType } from "../../context/UserContext";
import { INIT_QUESTION } from "../../constants/constants";
import { UserContext } from "./../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { QuestionType5 } from "../CreateQuestion/Question5";

const Vong5 = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [resetTime, setRestTime] = useState<number>(0);
  const [idPress, setIdPress] = useState<number>(0);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType5>(INIT_QUESTION);

  const hanlePressRung = (idUser: number) => {
    socket.emit(`pressRung5`, idUser);
    setIdPress(idUser);
  };

  const handleCheckDisable = () => {
    if (idPress === 0) return false;
    if (idPress === user?.id) return false;
    return true;
  };

  useEffect(() => {
    socket.emit("listUserGame5", "listUser");
    socket.on("questionServer5", (msg: QuestionType5) => {
      setNumberQuestion(msg);
      setRestTime((pre) => pre + 1);
    });

    socket.on("listUserGameServer5", (msg: UserType[]) => {
      setListUser([...msg]);
    });
    socket.on("pressRungServer5", (msg: number) => {
      setIdPress(msg);
    });
    return () => {
      socket.off();
    };
  }, [socket, navigate]);

  return (
    <div className="flex flex-col justify-end gap-8 h-screen p-10">
      <div className=" flex justify-end gap-3 items-center">
        <Button
          disabled={handleCheckDisable()}
          onClick={() => hanlePressRung(user.id)}
        >
          Chuông
        </Button>
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
      </div>
      <div className="flex gap-6 justify-stretch h-52 ">
        <Card className="flex-1  baseColor relative">
          <p className="text-2xl text-white pt-5">{numberQuestion?.ques}</p>
          <div className=" flex gap-6 absolute  w-full -top-6 left-0">
            {listUser?.map((item) => (
              <div className="w-full bg-slate-700 relative" key={item?.id}>
                <p
                  style={{
                    backgroundColor: idPress === item?.id ? "red" : "",
                  }}
                  key={item?.fullName}
                  className="text-center flex-1 text-white bg-[#c972f4] p-3 text-2xl border border-solid border-white"
                >{`${item?.fullName} (${item?.score})`}</p>
              </div>
            ))}
          </div>
        </Card>
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

export default Vong5;
