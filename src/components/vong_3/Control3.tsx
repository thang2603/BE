import { Button, Card, Input, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserType, UserUpdateType } from "../../context/UserContext";
import { QuestionType, QuestionType2 } from "../../types/Login";
import { INIT_QUESTION } from "../../constants/constants";
import { convertScore, onChangeData } from "../../constants/until";

const Control3 = () => {
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const [listQuestion, setListQuestion] = useState<QuestionType2[]>([]);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);
  useEffect(() => {
    socket.on("listUserServer3", (msg: UserType[]) => {
      console.log(msg);
      const newData = convertScore(msg);
      setListUser(newData);
    });
    socket.on("listQuestionServer3", (msg: QuestionType2[]) => {
      setListQuestion([...msg]);
    });
    socket.on("questionServer3", (msg: QuestionType) => {
      console.log(msg);
      setNumberQuestion({ ...msg });
    });

    return () => {
      socket.off("listUserServer3");
    };
  }, []);

  const handleGetListUser = () => {
    socket.emit("listUser3", "admin");
    socket.emit("listQuestion3", "admin");
  };

  const handleGetQuestion = (index: number) => {
    socket.emit("question3", index);
  };

  const handleStart = () => {
    socket.emit("startControl3", "Start");
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
          <div>
            <div className="flex gap-6">
              <Button onClick={handleGetListUser}>
                Lấy danh sách thí sinh
              </Button>

              <Button onClick={handleStart}>Bắt đầu tính thời gian</Button>
              <Button onClick={handleShowResult}>
                Hiện thị câu trả lời của thí sinh
              </Button>
              <Button onClick={updateScore}>Cập nhật</Button>
            </div>
            <p>Danh sách thí sinh</p>
          </div>
          <div className="flex gap-3">
            {listQuestion.map((item) => (
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleGetQuestion(item.no)}
                >{`Câu hỏi số ${item.id}`}</Button>
                {/* <Button
                  onClick={() => handleShowImage(item.id)}
                >{`Hiện thị câu trả lời ${item.id}`}</Button> */}
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
