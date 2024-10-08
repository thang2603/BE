import { Button, Card, Popconfirm, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserType } from "../../context/UserContext";
import {
  NumberQuestionType,
  QuestionType,
  UpdateScoreType,
} from "../../types/Login";
import { INIT_QUESTION } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const listQuestion = [1, 2, 3, 4, 5, 6];
const Control1 = () => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserType[]>([]);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);

  const handleGetListUser = () => {
    socket.emit("listUserAndScore", "admin");
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

  const handleNextGroup = () => {
    navigate("/vong-group/1/control");
    socket.emit("nextGroup1", "next1");
  };

  const handleStarTurn = () => {
    socket.emit("startTurnControl", "start");
  };

  const handlePreMainTime = () => {
    socket.emit("preMainTimeControl", "start");
  };

  const handleCorrectAnswer = () => {
    socket.emit("correctAnswerControl1", "start");
  };

  const handleWrongAnswer = () => {
    socket.emit("wrongAnswerControl1", "start");
  };

  const handleFinishTurn = () => {
    socket.emit("finishTurnrControl1", "start");
  };

  useEffect(() => {
    socket.on("listUserAndScoreServer", (msg: UserType[]) => {
      setListUser([...msg]);
    });

    socket.on("quesGame1Server", (msg: any) => {
      setNumberQuestion({ ...msg });
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Danh sách câu hỏi",
      dataIndex: "id",
      key: "id",
      render: (text: number, data: UserType) => (
        <div className="flex gap-2 flex-wrap">
          {listQuestion.map((item) => (
            <Button
              onClick={() =>
                handleNextQuestion({
                  idUser: text as number,
                  noQues: item,
                })
              }
            >{`Câu hỏi ${item}`}</Button>
          ))}
        </div>
      ),
    },
    {
      title: "Điểm hiện tại",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Cập nhật điểm",
      dataIndex: "score",
      key: "score",
      render: (text: number, data: UserType) => (
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() =>
              handleUpdateScore({
                idUser: data.id as number,
                score: data.score + 10,
              })
            }
          >
            Cộng 10 điểm
          </Button>
          <Button
            onClick={() =>
              handleUpdateScore({
                idUser: data.id as number,
                score: data.score - 5,
              })
            }
          >
            Trừ 5 điểm
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card title="Control">
      <div>
        <p>
          Câu hỏi {numberQuestion.no}: {numberQuestion.ques}
        </p>
        <p>Câu trả lời : {numberQuestion.ans}</p>
      </div>
      <div className="flex gap-3 flex-col">
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleStarTurn}>Âm thanh bắt đầu lượt thi</Button>
            <Button onClick={handlePreMainTime}>
              Âm thanh thời gian trước khi bắt đầu
            </Button>
            <Button onClick={handlePreMainTime}>
              Âm thanh thời gian bắt đầu thi
            </Button>
            <Button onClick={handleCorrectAnswer}>Âm thanh trả lời đúng</Button>
            <Button onClick={handleWrongAnswer}>Âm thanh trả lời sai</Button>
            <Button onClick={handleFinishTurn}>Kết thúc lượt thi</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGetListUser}>Lấy danh sách thí sinh</Button>
            <Button onClick={handleStart}>Bắt đầu tính thời gian</Button>
            <Popconfirm
              title="Chuyến sang phần thi chung vòng 1"
              onConfirm={handleNextGroup}
            >
              <Button>Chuyển sang phần thi chung</Button>
            </Popconfirm>
          </div>
        </div>
        <div className=" flex items-center gap-6"></div>
      </div>
      <div>
        <Table columns={columns} dataSource={listUser} bordered />
      </div>
    </Card>
  );
};

export default Control1;
