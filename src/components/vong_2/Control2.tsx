import { Button, Card, Popconfirm, Select, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserType, UserUpdateType } from "../../context/UserContext";
import { QuestionType, QuestionType2 } from "../../types/Login";
import { INIT_QUESTION } from "../../constants/constants";
import { convertScore, onChangeData } from "../../constants/until";
import { useNavigate } from "react-router-dom";
import { DefaultOptionType } from "antd/es/select";

const OPTION_SCORE_2: DefaultOptionType[] = [
  {
    value: 0,
    label: "0 điểm",
  },
  {
    value: 10,
    label: "10 Điểm",
  },
];
const Control2 = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const [listQuestion, setListQuestion] = useState<QuestionType2[]>([]);

  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);
  useEffect(() => {
    socket.emit("listUser2", "admin");
    socket.emit("listQuestion2", "admin");
    socket.on("listUserServer2", (msg: UserType[]) => {
      const newData = convertScore(msg);
      setListUser(newData);
    });
    socket.on("listQuestionServer2", (msg: QuestionType2[]) => {
      setListQuestion([...msg]);
    });
    socket.on("questionServer2", (msg: QuestionType) => {
      console.log(msg);
      setNumberQuestion({ ...msg });
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  const handleNextGame3 = () => {
    socket.emit("next3", "next3");
    navigate("/vong/3/control");
  };
  const handleGetListUser = () => {
    socket.emit("listUser2", "admin");
    socket.emit("listQuestion2", "admin");
  };

  const handleGetQuestion = (index: number) => {
    socket.emit("question2", index);
  };

  const handleStart = () => {
    socket.emit("startControl2", "Start");
  };

  const updateScore = () => {
    socket.emit("updateScore2", listUser);
  };

  const handleShowResult = () => {
    socket.emit("showResult2", "showResult");
  };

  const handleShowImage = (id: number) => {
    socket.emit("showImage2", id);
  };

  const handleChoseRow = () => {
    socket.emit("choseRowControl", "nhac");
  };

  const handleAllWrong = () => {
    socket.emit("allWrongControl", "nhac");
  };

  const handleCorrectObstacle = () => {
    socket.emit("correctObstacle", "nhac1");
  };

  const handleChangeData = (idUser: number, value: number) => {
    const newData = onChangeData(listUser, idUser, value);
    setListUser(newData);
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
      title: "Hành động",
      dataIndex: "address",
      key: "address",
      render: (text: string, record: UserUpdateType) => (
        <Select
          value={record?.updateScore}
          options={OPTION_SCORE_2}
          className="w-32"
          onChange={(e) => handleChangeData(record?.id, e)}
        />
      ),
    },
  ];

  return (
    <div className="flex ">
      <Card title="Control" className="flex flex-col gap-2">
        <div>
          <p>
            Câu hỏi {numberQuestion?.no}: {numberQuestion?.ques}
          </p>
          <p>Câu trả lời : {numberQuestion?.ans}</p>
        </div>
        <div className="flex gap-2 py-2">
          <Button onClick={handleChoseRow}>Phát nhạc chọn hàng ngang</Button>
          <Button onClick={handleAllWrong}>Phát nhạc khi không ai đúng </Button>
          <Button onClick={handleCorrectObstacle}>
            Phát nhạc đúng chướng ngại vật
          </Button>
        </div>
        <div className="flex gap-3 flex-col">
          <div>
            <div className="flex gap-3 flex-wrap">
              <Button onClick={handleGetListUser}>
                Lấy danh sách thí sinh
              </Button>
              <Button onClick={handleStart}>Bắt đầu tính thời gian</Button>
              <Button onClick={handleShowResult}>
                Hiện thị câu trả lời của thí sinh
              </Button>
              <Button onClick={updateScore}>Cập nhật điểm</Button>
              <Popconfirm
                title="Bạn có muốn chuyển qua vòng 3 không ?"
                onConfirm={handleNextGame3}
              >
                <Button>Chuyển qua vòng 3</Button>
              </Popconfirm>
            </div>
            <p>Danh sách thí sinh</p>
          </div>
          <div className="flex gap-3">
            {listQuestion.map((item) => (
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleGetQuestion(item.no)}
                >{`Câu hỏi số ${item.no}`}</Button>
                <Button
                  onClick={() => handleShowImage(item.no)}
                >{`Hiện thị câu trả lời ${item.no}`}</Button>
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

export default Control2;
