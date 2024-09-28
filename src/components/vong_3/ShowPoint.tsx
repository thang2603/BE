import { Timeline } from "antd";
import PointItem from "./PointItem";

import { AnserDetailType } from "../../types/Login";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserUpdateType } from "../../context/UserContext";
interface DataTypeProps {
  listAnswer: AnserDetailType[];
}

const ShowPoint = ({ listAnswer }: DataTypeProps) => {
  const audioShowAnswer = useRef<HTMLAudioElement>(null);
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    audioShowAnswer?.current?.play().catch((error) => {
      console.log("Playback prevented:", error);
    });
    socket.on("correctServer3", (msg: UserUpdateType[]) => {
      setListUser([...msg]);
    });
  }, [socket]);
  const checkAnswer = (idUser: number) => {
    const isCheck = [...listUser].find(
      (item) => item?.id === idUser && item.updateScore > 0
    );
    return !!isCheck;
  };
  return (
    <div className="slide-up">
      <div className="w-full flex items-center justify-center h-screen">
        <div className="w-1/4 flex items-center justify-center h-screen">
          <Timeline
            mode="left"
            className="flex-1"
            items={[
              {
                children: (
                  <PointItem
                    index={0}
                    name={listAnswer[0].fullName}
                    ans={listAnswer[0].ans}
                    time={listAnswer[0].updateAt}
                    isCorrect={checkAnswer(listAnswer[0].id)}
                  />
                ),
              },
              {
                children: (
                  <PointItem
                    index={1}
                    name={listAnswer[1].fullName}
                    ans={listAnswer[1].ans}
                    time={listAnswer[1].updateAt}
                    isCorrect={checkAnswer(listAnswer[1].id)}
                  />
                ),
              },
              {
                children: (
                  <PointItem
                    index={2}
                    name={listAnswer[2].fullName}
                    ans={listAnswer[2].ans}
                    time={listAnswer[2].updateAt}
                    isCorrect={checkAnswer(listAnswer[2].id)}
                  />
                ),
              },
              {
                children: (
                  <PointItem
                    index={3}
                    name={listAnswer[3].fullName}
                    ans={listAnswer[3].ans}
                    time={listAnswer[3].updateAt}
                    isCorrect={checkAnswer(listAnswer[3].id)}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="absolute">
        <audio ref={audioShowAnswer} src={`/vong3/sound/AnswersShowing.mp3`} />
      </div>
    </div>
  );
};

export default ShowPoint;
