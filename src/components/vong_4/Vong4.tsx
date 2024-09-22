import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Card } from "antd";
import { UserUpdateType } from "../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";
import { QuestionFourType } from "../../types/Login";
import { INIT_QUESTION_FOUR } from "../../constants/constants";
import MovingStar from "../Star/Start";
import { useNavigate } from "react-router-dom";

const Vong4 = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [resetTime, setRestTime] = useState<number>(0);
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const [question, setQuestion] =
    useState<QuestionFourType>(INIT_QUESTION_FOUR);

  const [star, setStar] = useState<number>(0);
  useEffect(() => {
    socket.on("listUserServer4", (msg: UserUpdateType[]) => {
      console.log(msg);
      setListUser([...msg]);
    });

    socket.on("sendQuestionServer4", (msg: QuestionFourType) => {
      setQuestion({ ...msg });
      setRestTime((pre) => pre + 1);
    });

    socket.on("startServer4", (msg: number) => {
      setStar(msg);
    });
    socket.on("cancelStartServer4", (msg: number) => {
      setStar(0);
    });
    socket.on("nextWaitScreenServer", (msg: string) => {
      navigate("/wait-screen");
    });
    return () => {
      socket.off();
    };
  }, [socket, navigate]);

  const findByUser = () => {
    const valueUser = [...listUser].find(
      (item) => item.id === question?.idUser
    );
    if (valueUser) return valueUser;
    return INIT_QUESTION_FOUR;
  };

  return (
    <div className="p-7  h-screen flex justify-end gap-8 flex-col">
      <div className="flex  justify-end ">
        <CountdownCircleTimer
          key={resetTime}
          isPlaying={!!resetTime}
          duration={15}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          // onComplete={() => handleNextQuestion(resetTimer)}
        >
          {Timer}
        </CountdownCircleTimer>
      </div>
      <div className="flex gap-6 justify-stretch h-52 ">
        <Card className="flex-1  baseColor relative">
          <p className="text-2xl text-white pt-5">{question?.ques}</p>
          <div className=" flex gap-6 absolute  w-full -top-6 left-0">
            {listUser?.map((item) => (
              <div className="w-full bg-slate-700 relative">
                {star === item?.id && <MovingStar />}
                <p
                  key={item?.fullName}
                  className="text-center flex-1 text-white bg-[#c972f4] p-3 text-2xl border border-solid border-white"
                >{`${item?.fullName} (${item?.score})`}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="w-96 relative flex justify-center items-center baseColor">
          <div className="absolute text-center text-white bg-[#c972f4] p-3 text-2xl w-full -top-6 left-0 border border-solid border-white">
            {`Câu ${question?.score} điểm`}
          </div>
          <p className="text-8xl text-white  ">{findByUser().score}</p>
        </Card>
      </div>
    </div>
  );
};

export default Vong4;
