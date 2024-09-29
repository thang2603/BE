import { useContext, useEffect, useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "../Timer/Timer";
import { Button, Card } from "antd";
import { UserContext, UserUpdateType } from "../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";
import { QuestionFourType } from "../../types/Login";
import { INIT_QUESTION_FOUR } from "../../constants/constants";
import MovingStar from "../Star/Start";
import { useNavigate } from "react-router-dom";
import "./Vong4.css";
import PackQuestion from "./PackQuestion";
import { INIT_OPTION } from "./Control4";
import FinishTurn from "../vong_1/FinishTurn";
const Vong4 = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [resetTime, setRestTime] = useState<number>(0);
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const [question, setQuestion] =
    useState<QuestionFourType>(INIT_QUESTION_FOUR);
  const [finishTurn, setFinishTurn] = useState<boolean>(false);
  const [listOption, setListOption] = useState<number[]>(INIT_OPTION);
  const [star, setStar] = useState<number>(0);

  const [userPress, setUserPress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioStartRound = useRef<HTMLAudioElement>(null);
  const audioStartTurn = useRef<HTMLAudioElement>(null);
  const audioCorrectFinish = useRef<HTMLAudioElement>(null);
  const audioWrongFinish = useRef<HTMLAudioElement>(null);
  const audio15Second = useRef<HTMLAudioElement>(null);
  const audioPackageChose = useRef<HTMLAudioElement>(null);
  const audioStarChose = useRef<HTMLAudioElement>(null);

  const handlePlayVideo = () => {
    videoRef?.current?.play().catch((error) => {
      console.error("Error playing video:", error);
    }); // Phát video và bắt lỗi nếu không thể phát
    videoRef?.current?.requestFullscreen();
  };

  const handleTimeQuestion = () => {
    if (question.score === 20) {
      return 15;
    }
    return 20;
  };

  const handlePressRung = () => {
    socket.emit("pressRung4", user?.id);
  };

  const isDisableRung = () => {
    if (userPress === 0) return false;
    if (user?.id === userPress) return false;
    return true;
  };
  useEffect(() => {
    audioStartRound?.current?.play().catch((error) => {
      console.log("Playback prevented:", error);
    });
    socket.emit("listUser4", "admin");
    socket.on("listUserServer4", (msg: UserUpdateType[]) => {
      setFinishTurn(false);
      setListUser([...msg]);
    });

    socket.on("sendQuestionServer4", (msg: QuestionFourType) => {
      setQuestion({ ...msg });
      setUserPress(0);
    });

    socket.on("startServer4", (msg: number) => {
      setStar(msg);
      audioStarChose?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("cancelStartServer4", (msg: number) => {
      setStar(0);
    });

    socket.on("startTimeServer4", (msg: number) => {
      handlePlayVideo();
      setRestTime((pre) => pre + 1);
      audio15Second?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });
    socket.on("nextWaitScreenServer", (msg: string) => {
      navigate("/wait-screen");
    });

    socket.on("optionQuestionServer4", (msg: number[]) => {
      setListOption([...msg]);
      audioPackageChose?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("finishTurnServer4", (msg: string) => {
      setFinishTurn((pre) => true);
      setRestTime(0);
      setQuestion(INIT_QUESTION_FOUR);
    });

    socket.on("startTurnServer4", (msg: string) => {
      audioStartTurn?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });

    socket.on("correctFinisherver4", (msg: string) => {
      audioCorrectFinish?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });
    socket.on("wrongFinishServer4", (msg: string) => {
      audioWrongFinish?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });
    socket.on("pressRungServer4", (msg: number) => {
      setUserPress(msg);
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
    <div>
      {finishTurn ? (
        <FinishTurn />
      ) : (
        <div>
          {question.type === 3 ? (
            <div className="video-container">
              <video className="video-fullscreen" ref={videoRef}>
                <source src={`/vong4/${question.ques}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="p-7  h-screen flex justify-end gap-8 flex-col">
              <div className="flex  justify-end  gap-8">
                {!question.id ? (
                  <PackQuestion listOption={listOption} />
                ) : (
                  <div className="flex items-center gap-6">
                    <Button
                      onClick={handlePressRung}
                      disabled={isDisableRung()}
                    >
                      Chuông
                    </Button>
                    <CountdownCircleTimer
                      key={resetTime}
                      isPlaying={!!resetTime}
                      duration={handleTimeQuestion()}
                      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                      colorsTime={[10, 6, 3, 0]}
                      // onComplete={() => handleNextQuestion(resetTimer)}
                    >
                      {Timer}
                    </CountdownCircleTimer>
                  </div>
                )}
              </div>
              <div className="flex gap-6 justify-stretch h-52 ">
                <Card className="flex-1  baseColor relative">
                  <p className="text-2xl text-white pt-5">{question?.ques}</p>
                  <div className=" flex gap-6 absolute  w-full -top-6 left-0">
                    {listUser?.map((item) => (
                      <div
                        className="w-full bg-slate-700 relative"
                        key={item?.id}
                      >
                        {star === item?.id && <MovingStar />}
                        <p
                          style={{
                            backgroundColor:
                              userPress === item?.id ? "red" : "",
                          }}
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
              <div>
                <div className="absolute">
                  <audio
                    ref={audioStartRound}
                    src={`/vong4/sound/StartRound.mp3`}
                  />
                </div>
                <div className="absolute">
                  <audio
                    ref={audioStartTurn}
                    src={`/vong4/sound/StartTurn.mp3`}
                  />
                </div>
                <div className="absolute">
                  <audio
                    ref={audioCorrectFinish}
                    src={`/vong4/sound/CorrectFinish.mp3`}
                  />
                </div>
                <div className="absolute">
                  <audio
                    ref={audioWrongFinish}
                    src={`/vong4/sound/WrongFinish.mp3`}
                  />
                </div>
                <div className="absolute">
                  <audio
                    ref={audioPackageChose}
                    src={`/vong4/sound/PackageChoose.mp3`}
                  />
                </div>
                <div className="absolute">
                  <audio
                    ref={audioStarChose}
                    src={`/vong4/sound/StarChoose.mp3`}
                  />
                </div>
                {question.score === 20 ? (
                  <div className="absolute">
                    <audio
                      ref={audio15Second}
                      src={`/vong4/sound/15Seconds.mp3`}
                    />
                  </div>
                ) : (
                  <div className="absolute">
                    <audio
                      ref={audio15Second}
                      src={`/vong4/sound/20Seconds.mp3`}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vong4;
