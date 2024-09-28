import { Button, Card, Input, Popconfirm, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserType, UserUpdateType } from "../../context/UserContext";
import { QuestionType, QuestionType2 } from "../../types/Login";
import { INIT_QUESTION } from "../../constants/constants";
import { convertScore, onChangeData } from "../../constants/until";
import { useNavigate } from "react-router-dom";

const Control3 = () => {
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const [listQuestion, setListQuestion] = useState<QuestionType2[]>([]);
  const [duration, setDuration] = useState<number>(15);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);

  const navigate = useNavigate();
  useEffect(() => {
    socket.on("listUserServer3", (msg: UserType[]) => {
      const newData = convertScore(msg);
      setListUser(newData);
    });
    socket.on("listQuestionServer3", (msg: QuestionType2[]) => {
      setListQuestion([...msg]);
    });
    socket.on("questionServer3", (msg: QuestionType) => {
      setNumberQuestion({ ...msg });
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  const handleNextGame4 = () => {
    socket.emit("next4", "next4");
    navigate("/vong/4/control");
  };

  const handleGetListUser = () => {
    socket.emit("listUser3", "admin");
    socket.emit("listQuestion3", "admin");
  };

  const handleGetQuestion = (index: number, idQues: number) => {
    socket.emit("question3", { no: index, idQues: idQues });
  };

  const handleStart = () => {
    socket.emit("startControl3", duration);
  };

  const updateScore = () => {
    socket.emit("updateScore3", listUser);
  };

  const handleChangeData = (iduser: number, valueNumber: number) => {
    const newData = onChangeData(listUser, iduser, valueNumber);
    setListUser(newData);
  };

  const handleShowResult = () => {
    socket.emit("showResult3", "showResult");
  };

  const handleStartRound = () => {
    socket.emit("startRound3", "startRound3");
  };

  const handleStartQuestion = () => {
    socket.emit("startSoundQuestion3", "startRound3");
  };
  const handleCorrect = () => {
    socket.emit("soundCorrect3", "soundCorrect3");
  };
  const handle10Second = () => {
    socket.emit("sound10Second", "sound10Second");
  };
  const handle20Second = () => {
    socket.emit("sound20Second", "sound20Second");
  };
  const handle30Second = () => {
    socket.emit("sound30Second", "sound30Second");
  };
  const handle40Second = () => {
    socket.emit("sound40Second", "sound40Second");
  };
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Tổng điểm hiên tại",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Điểm khi được cập nhật",
      dataIndex: "score",
      key: "score",
      render: (text: number, record: UserUpdateType) => (
        <p>{record?.score + record?.updateScore}</p>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "address",
      key: "address",
      render: (text: string, record: UserUpdateType) => (
        <div className="flex gap-2 justify-center items-center">
          <Input
            type="number"
            value={record?.updateScore}
            onChange={(e) =>
              handleChangeData(record?.id, Number(e.target.value))
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex ">
      <Card title="Control">
        <div>
          <p>
            Câu hỏi {numberQuestion?.no}: {numberQuestion?.ques}
          </p>
          <p>Câu trả lời : {numberQuestion?.ans}</p>
        </div>
        <div className="flex gap-3 flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex  gap-2">
              <Button onClick={handleStartRound}>
                Âm thanh bắt đầu vòng thi
              </Button>
              <Button onClick={handleStartQuestion}>
                Âm thanh bắt đầu câu hỏi
              </Button>
              <Button onClick={handleCorrect}>Âm thanh trả lời đúng</Button>
              <Button onClick={handle10Second}>Âm thanh 10 giây</Button>
              <Button onClick={handle20Second}>Âm thanh 20 giây</Button>
              <Button onClick={handle30Second}>Âm thanh 30 giây</Button>
              <Button onClick={handle40Second}>Âm thanh 40 giây</Button>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleGetListUser}>
                Lấy danh sách thí sinh
              </Button>

              <Button onClick={handleShowResult}>
                Hiện thị câu trả lời của thí sinh
              </Button>
              <Button onClick={updateScore}>Cập nhật điểm</Button>
              <Popconfirm
                title="Bạn có muốn chuyển qua vòng 4 không ?"
                onConfirm={handleNextGame4}
              >
                <Button>Chuyển qua vòng 4</Button>
              </Popconfirm>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <Button onClick={handleStart}>Bắt đầu tính thời gian</Button>
                <Input
                  type="number"
                  min={1}
                  className="w-32"
                  onChange={(e) => setDuration(Number(e.target.value))}
                  value={duration}
                />
              </div>
              <p>Danh sách thí sinh</p>
            </div>
          </div>
          <div className="flex gap-3">
            {listQuestion.map((item) => (
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleGetQuestion(item.no, item.id)}
                >{`Câu hỏi số ${item.no}`}</Button>
              </div>
            ))}
          </div>

          <div>
            <Table columns={columns} dataSource={listUser} pagination={false} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Control3;
