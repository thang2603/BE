import { Timeline } from "antd";
import PointItem from "./PointItem";
import "./ShowPoint.css";
import { AnserDetailType } from "../../types/Login";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserUpdateType } from "../../context/UserContext";
interface DataTypeProps {
  listAnswer: AnserDetailType[];
}

const ShowPoint = ({ listAnswer }: DataTypeProps) => {
  const audioAnswerShowing = useRef<HTMLAudioElement>(null);
  const audioCorrectRow = useRef<HTMLAudioElement>(null);
  const [answerCorrect, setAnswerCorrect] = useState<UserUpdateType[]>([]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    audioAnswerShowing?.current?.play().catch((error) => {
      console.log("Playback prevented:", error);
    });
    socket.on("updateScoreCorrect", (msg: UserUpdateType[]) => {
      setAnswerCorrect([...msg]);
      audioCorrectRow?.current?.play().catch((error) => {
        console.log("Playback prevented:", error);
      });
    });
  }, [socket]);

  const isCorrect = (idUser: number) => {
    const isCheck = [...answerCorrect].find(
      (item) => item.id === idUser && item.updateScore > 0
    );
    if (!!isCheck)
      return "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(232,35,35,1) 0%, rgba(252,176,69,1) 100%)";
    return "";
  };
  return (
    <div>
      <div className="absolute">
        <audio ref={audioAnswerShowing} src={`/vong2/AnswersShowing.mp3`} />
      </div>
      <div className="absolute">
        <audio ref={audioCorrectRow} src={`/vong2/CorrectRow.mp3`} />
      </div>
      <div className="slide-up">
        <div className="w-full flex items-center justify-center h-screen">
          <div className="w-3/5 flex items-center justify-center h-screen">
            <Timeline
              mode="alternate"
              className="flex-1"
              items={[
                {
                  children: (
                    <PointItem
                      color={isCorrect(listAnswer[0].id)}
                      index={0}
                      name={listAnswer[0].fullName}
                      ans={listAnswer[0].ans}
                    />
                  ),
                },
                {
                  children: (
                    <PointItem
                      color={isCorrect(listAnswer[1].id)}
                      index={1}
                      name={listAnswer[1].fullName}
                      ans={listAnswer[1].ans}
                    />
                  ),
                },
                {
                  children: (
                    <PointItem
                      color={isCorrect(listAnswer[2].id)}
                      index={2}
                      name={listAnswer[2].fullName}
                      ans={listAnswer[2].ans}
                    />
                  ),
                },
                {
                  children: (
                    <PointItem
                      color={isCorrect(listAnswer[3].id)}
                      index={3}
                      name={listAnswer[3].fullName}
                      ans={listAnswer[3].ans}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPoint;
