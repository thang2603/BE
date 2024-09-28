import { useContext, useEffect, useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card, Input, Typography } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { UserContext, UserType } from "../../context/UserContext";

import { AnserDetailType, AnswerType, QuestionType3 } from "../../types/Login";

import ShowPoint from "./ShowPoint";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../Slide/SideImage";
import { INIT_QUESTION_3 } from "../CreateQuestion/Question3";

const Vong3 = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [resetTime, setRestTime] = useState({
    isPlaying: false,
    duration: 25,
  });
  const { user } = useContext(UserContext);

  const audioStartRound = useRef<HTMLAudioElement>(null);
  const audioStartQuestion = useRef<HTMLAudioElement>(null);
  const audioStart10Second = useRef<HTMLAudioElement>(null);
  const audioStart20Second = useRef<HTMLAudioElement>(null);
  const audioStart30Second = useRef<HTMLAudioElement>(null);
  const audioStart40Second = useRef<HTMLAudioElement>(null);

  const [answer, setAnswer] = useState<string>("");
  const [updateTime, setUpdateTime] = useState<number>(15);
  const [listAnswer, setListAnswer] = useState<AnserDetailType[]>([]);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType3>(INIT_QUESTION_3);

  useEffect(() => {
    socket.on("listUserServer3", (msg: UserType[]) => {
      setListUser([...msg]);
      setListAnswer([]);
    });

    socket.on("questionServer3", (msg: QuestionType3) => {
      setNumberQuestion({ ...msg });
    });

    socket.on("startTimeServer3", (msg: number) => {
      setRestTime((pre) => ({ ...pre, isPlaying: true, duration: msg }));
    });

    socket.on("showResultServer3", (msg: AnserDetailType[]) => {
      setListAnswer([...msg]);
      setRestTime((pre) => ({ ...pre, isPlaying: false }));
    });

    socket.on("nextWaitScreenServer", (msg: string) => {
      navigate("/wait-screen");
    });

    socket.on("startRoundServer3", async (msg: any) => {
      audioStartRound?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("startSoundQuestionServer3", async (msg: any) => {
      audioStartQuestion?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("sound10SecondServer3", async (msg: any) => {
      audioStart10Second?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("sound20SecondServer3", async (msg: any) => {
      audioStart20Second?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("sound30SecondServer3", async (msg: any) => {
      audioStart30Second?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("sound40SecondServer3", async (msg: any) => {
      audioStart40Second?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    return () => {
      socket.off();
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

  return (
    <div>
      {listAnswer.length > 0 ? (
        <ShowPoint listAnswer={listAnswer} />
      ) : (
        <div className="flex gap-20 justify-center  p-20">
          <div className="">
            <div className="flex flex-col gap-2 w-[900px]">
              <Card className="baseColor text-white">
                <Typography className="text-white text-xl">
                  {numberQuestion.ques}
                </Typography>
              </Card>

              <Card className="flex baseColor justify-center">
                <div className="w-[800px] h-[600px]">
                  {resetTime.isPlaying && (
                    <ImageCarousel
                      listImage={numberQuestion.image}
                      resetTime={resetTime}
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <CountdownCircleTimer
              key={resetTime.duration}
              isPlaying={resetTime.isPlaying}
              duration={resetTime.duration}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[30, 20, 10, 0]}
              onUpdate={(value) => setUpdateTime(value)}
              // onComplete={() => handleNextQuestion(resetTimer)}
            >
              {Timer}
            </CountdownCircleTimer>
            {user?.role === "USER" && (
              <div>
                <Input
                  placeholder="Nhập câu trả lời"
                  size="large"
                  className="p-8 flex-1 text-2xl"
                  onChange={(e) => setAnswer(e?.target?.value)}
                />
                <Button onClick={handleSubmit}>Gửi câu trả lời</Button>
              </div>
            )}
            {user?.role === "MC" && (
              <div>
                <Card title="Đáp an">
                  <p>{numberQuestion?.ans}</p>
                </Card>
              </div>
            )}
            <div></div>
          </div>
          <div>
            <div className="absolute">
              <audio
                ref={audioStartRound}
                src={`/vong3/sound/StartRound.mp3`}
              />
            </div>
            <div className="absolute">
              <audio
                ref={audioStartQuestion}
                src={`/vong3/sound/QuestionShowing.mp3`}
              />
            </div>
            <div className="absolute">
              <audio
                ref={audioStart10Second}
                src={`/vong3/sound/10Seconds.mp3`}
              />
            </div>
            <div className="absolute">
              <audio
                ref={audioStart20Second}
                src={`/vong3/sound/20Seconds.mp3`}
              />
            </div>
            <div className="absolute">
              <audio
                ref={audioStart30Second}
                src={`/vong3/sound/30Seconds.mp3`}
              />
            </div>
            <div className="absolute">
              <audio
                ref={audioStart40Second}
                src={`/vong3/sound/40Seconds.mp3`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vong3;
