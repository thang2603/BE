import { Button, Card, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserType } from "../../context/UserContext";
import {
  NumberQuestionType,
  QuestionType,
  UpdateScoreType,
} from "../../types/Login";
import { INIT_QUESTION } from "../../constants/constants";

const Control1 = () => {
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);
  const handleGetListUser = () => {
    socket.emit("listUser", "admin");
  };

  const handleNextQuestion = (msg: NumberQuestionType) => {
    if (msg.noQues <= 6) {
      socket.emit("quesGame1", msg);
    }
  };

  const handleUpdateScore = (msg: UpdateScoreType) => {
    socket.emit("updateScore", msg);
  };

  const handleStart = () => {
    socket.emit("startControl", "Start");
  };

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
      socket.off("quesGame1Server");
    };
  }, [socket]);
  return (
    <Card title="Control">
      <div>
        <p>
          Câu hỏi {numberQuestion.no}: {numberQuestion.ques}
        </p>
        <p>Câu trả lời : {numberQuestion.ans}</p>
      </div>
      <div className="flex gap-3 flex-col">
        <div>
          <p>Danh sách thí sinh</p>
          <Button onClick={handleGetListUser}>Lấy danh sách thí sinh</Button>
        </div>
        <div className=" flex items-center gap-6">
          <div className="flex items-center gap-2 flex-col">
            {listUser.map((item) => (
              <div key={item?.id} className="flex items-center gap-4">
                <p>{item.fullName}</p>
                <Button
                  onClick={() =>
                    handleNextQuestion({
                      idUser: item.id as number,
                      noQues: numberQuestion.no + 1,
                    })
                  }
                >
                  Lấy câu hỏi
                </Button>

                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      handleUpdateScore({
                        idUser: item.id as number,
                        score: item.score + 10,
                      })
                    }
                  >
                    Cộng 10 điểm
                  </Button>
                  <Button
                    onClick={() =>
                      handleUpdateScore({
                        idUser: item.id as number,
                        score: item.score - 5,
                      })
                    }
                  >
                    Trừ 5 điểm
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={handleStart}>Bắt đầu tính thời gian</Button>
        </div>
      </div>
    </Card>
  );
};

export default Control1;
