import { useContext, useEffect, useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Card } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserContext, UserType } from "../../context/UserContext";
import { INIT_QUESTION } from "../../constants/constants";
import { QuestionType } from "../../types/Login";
import { useNavigate } from "react-router-dom";
import FinishTurn from "./FinishTurn";

const Vong1 = () => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const audioStartRound = useRef<HTMLAudioElement>(null);
  const audioStartTurn = useRef<HTMLAudioElement>(null);
  const audioPreMainTime = useRef<HTMLAudioElement>(null);
  const audioMainTime = useRef<HTMLAudioElement>(null);
  const audioCorrectAnswer = useRef<HTMLAudioElement>(null);
  const audioWrongAnswer = useRef<HTMLAudioElement>(null);

  const [listUser, setListUser] = useState<UserType[]>([]);
  const { user } = useContext(UserContext);
  const [resetTime, setRestTime] = useState<number>(0);
  const [finishTurn, setFinishTurn] = useState<boolean>(false);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);

  const handleShowName = () => {
    const nameUser = listUser.find(
      (item) => item?.id === numberQuestion?.idUser
    );
    return nameUser?.fullName || "";
  };
  useEffect(() => {
    audioStartRound?.current?.play().catch((error) => {
      console.log("Playback prevented:", error);
    });

    socket.emit("listUserAndScore", "admin");
    socket.on("listUserAndScoreServer", (msg: UserType[]) => {
      setFinishTurn(false);
      setListUser((pre) => [...msg]);
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

    socket.on("startTurnlServer1", (msg: string) => {
      audioStartTurn?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("preMainTimeControlServer1", (msg: string) => {
      audioPreMainTime.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("correctAnswerServer1", (msg: string) => {
      audioCorrectAnswer.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("wrongAnswerServer1", (msg: string) => {
      audioWrongAnswer.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("finishTurnrServer1", (msg: string) => {
      setFinishTurn((pre) => true);
    });
    return () => {
      socket.off();
    };
  }, [socket, navigate]);

  return (
    <div>
      {finishTurn ? (
        <FinishTurn />
      ) : (
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
          <div className="relative">
            <div className="absolute">
              <audio ref={audioStartRound} src={`/vong1/StartRound.mp3`} />
            </div>
            <div className="absolute">
              <audio ref={audioStartTurn} src={`/vong1/StartTurn.mp3`} />
            </div>
            <div className="absolute">
              <audio ref={audioPreMainTime} src={`/vong1/PreMainTime.mp3`} />
            </div>
            <div className="absolute">
              <audio ref={audioMainTime} src={`/vong1/MainTime.mp3`} />
            </div>

            <div className="absolute">
              <audio
                ref={audioCorrectAnswer}
                src={`/vong1/CorrectAnswer.mp3`}
              />
            </div>

            <div className="absolute">
              <audio ref={audioWrongAnswer} src={`/vong1/WrongAnswer.mp3`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vong1;
