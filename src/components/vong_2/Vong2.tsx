import { useContext, useEffect, useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card, Input } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserContext, UserType } from "../../context/UserContext";
import { INIT_QUESTION_2 } from "../../constants/constants";
import { AnserDetailType, AnswerType, QuestionType2 } from "../../types/Login";
import ImageMagic from "./ImageMagic";
import RowWord from "./RowWord";
import ShowPoint from "./ShowPoint";
import { useNavigate } from "react-router-dom";
import "./Vong2.css";
const Vong2 = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [resetTime, setRestTime] = useState<number>(0);
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState<string>("");
  const [updateTime, setUpdteTime] = useState<number>(15);
  const [listAnswer, setListAnswer] = useState<AnserDetailType[]>([]);
  const [listQuestion, setListQuestion] = useState<QuestionType2[]>([]);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType2>(INIT_QUESTION_2);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioStartRef = useRef<HTMLAudioElement>(null);
  const audioTimeRef = useRef<HTMLAudioElement>(null);
  const audioRowShow = useRef<HTMLAudioElement>(null);
  const audioChoseRow = useRef<HTMLAudioElement>(null);
  const audioWrongRow = useRef<HTMLAudioElement>(null);
  const audioPictureReveal = useRef<HTMLAudioElement>(null);
  const audioAnswerShowing = useRef<HTMLAudioElement>(null);
  const audioCorrectObstacle = useRef<HTMLAudioElement>(null);
  const handleEndAuioStart = () => {
    audioRowShow?.current?.play().catch((error) => {
      console.log("Playback prevented:", error);
    });
    setIsAudioEnded(true);
  };

  useEffect(() => {
    audioStartRef?.current?.play().catch((error) => {
      console.log("Playback prevented:", error);
    });
    socket.emit("listUser2", "admin");
    socket.emit("listQuestion2", "admin");
    socket.on("listUserServer2", (msg: UserType[]) => {
      setListUser([...msg]);
      setListAnswer([]);
    });

    socket.on("listQuestionServer2", (msg: QuestionType2[]) => {
      console.log("audi");
      audioPictureReveal?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
      setListQuestion([...msg]);
    });

    socket.on("questionServer2", (msg: QuestionType2) => {
      setNumberQuestion({ ...msg });
      audioRef?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("startTimeServer2", (msg: UserType[]) => {
      setRestTime((pre) => pre + 1);
      audioTimeRef?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("showResultServer2", (msg: AnserDetailType[]) => {
      console.log("show answer");
      setListAnswer([...msg]);
      setRestTime(0);
      audioAnswerShowing?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("nextWaitScreenServer", (msg: string) => {
      navigate("/wait-screen");
    });

    socket.on("choseRowServer", (msg: string) => {
      audioChoseRow?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("allWrongServer", (msg: string) => {
      audioWrongRow?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });
    socket.on("correctObstacleServer", (msg: string) => {
      audioCorrectObstacle?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });
    return () => {
      socket.off();
    };
  }, [socket, navigate]);

  const handleSubmit = () => {
    if (user?.id) {
      const ans: AnswerType = { idUser: user?.id, ans: answer };
      socket.emit("answer2", ans);
    }
  };

  return (
    <div>
      {listAnswer?.length > 0 ? (
        <div>
          <ShowPoint listAnswer={listAnswer} />
        </div>
      ) : (
        <div className="flex flex-col justify-between gap-8 h-screen p-16 overflow-hidden">
          <div className="absolute">
            <audio
              ref={audioStartRef}
              src={`/vong2/StartRound.mp3`}
              onEnded={handleEndAuioStart}
            />
          </div>
          <div className={`${isAudioEnded ? "opacity-100" : "opacity-0"}`}>
            <div className="flex justify-center ">
              <div className="flex gap-10">
                <div className="absolute">
                  <audio ref={audioRowShow} src={`/vong2/RowsShow.mp3`} />
                </div>
                <div className="absolute">
                  <audio ref={audioChoseRow} src={`/vong2/RowChoose.mp3`} />
                </div>
                <div className="absolute">
                  <audio ref={audioWrongRow} src={`/vong2/WrongRow.mp3`} />
                </div>
                <div className="absolute">
                  <audio
                    ref={audioPictureReveal}
                    src={`/vong2/PictureReveal.mp3`}
                  />
                </div>
                <ImageMagic listQuestion={listQuestion} />
                <RowWord listQuestion={listQuestion} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 ">
            <div className=" flex justify-end items-center gap-20 ">
              {user?.role === "MC" && (
                <Card title="Đáp án">
                  <p className="min-h-9 font-semibold text-2xl">
                    {numberQuestion.ans}
                  </p>
                </Card>
              )}
              <div>
                <div className="movingBox">
                  <CountdownCircleTimer
                    key={resetTime}
                    isPlaying={!!resetTime}
                    duration={15}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[15, 10, 5, 0]}
                    onUpdate={(value) => setUpdteTime(value)}
                    // onComplete={() => handleNextQuestion(resetTimer)}
                  >
                    {Timer}
                  </CountdownCircleTimer>
                </div>
                <div className="absolute">
                  <audio ref={audioTimeRef} src={`/vong2/15Seconds.mp3`} />
                </div>
              </div>

              {numberQuestion?.type === 2 && (
                <audio
                  ref={audioRef}
                  src={`/vong2/${numberQuestion?.link}.mp3`}
                />
              )}
            </div>
            <div className="flex  gap-6 min-w-[1000px] ">
              <Card
                title={
                  <p className="text-white">{`Câu hỏi ${numberQuestion.no}`}</p>
                }
                className="flex-1 baseColor movingBoxLeft "
              >
                <p className="text-white font-semibold">
                  {numberQuestion.ques}
                </p>
              </Card>
              <div className="min-w-96 flex flex-col gap-2 movingBox">
                {listUser.map((item) => (
                  <div
                    key={item?.id}
                    className="flex gap-2 items-center justify-between baseColor text-white rounded-md p-2"
                  >
                    <p className="font-semibold">{item.fullName}</p>
                    <p className="w-7 font-semibold">{item?.score}</p>
                  </div>
                ))}
              </div>
            </div>

            {user.role === "USER" && (
              <div className="flex gap-10">
                <Input onChange={(e) => setAnswer(e.target.value)}></Input>
                <Button
                  disabled={!updateTime}
                  onClick={handleSubmit}
                  className="w-[450px]"
                >
                  Gửi câu trả lời
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="absolute">
        <audio
          ref={audioCorrectObstacle}
          src={`/vong2/CorrectObstacle.mp3`}
          onEnded={handleEndAuioStart}
        />
      </div>
    </div>
  );
};

export default Vong2;
