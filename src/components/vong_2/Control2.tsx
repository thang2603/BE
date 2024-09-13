import { Button, Card, Popconfirm, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserType, UserUpdateType } from "../../context/UserContext";
import { QuestionType, QuestionType2 } from "../../types/Login";
import { INIT_QUESTION } from "../../constants/constants";
import { convertScore } from "../../constants/until";
import { useNavigate } from "react-router-dom";

const Control2 = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const [listQuestion, setListQuestion] = useState<QuestionType2[]>([]);
  const [numberQuestion, setNumberQuestion] =
    useState<QuestionType>(INIT_QUESTION);
  useEffect(() => {
    socket.on("listUserServer2", (msg: UserType[]) => {
      console.log(msg);
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
      socket.off("listUserServer2");
    };
  }, [socket]);

  // useEffect(() => {
  //   socket.emit("listUser2", "admin");
  //   socket.emit("listQuestion2", "admin");
  // }, [socket]);

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

  const updateScore = (itemUser: UserUpdateType) => {
    const newData: UserUpdateType = { ...itemUser, updateScore: 10 };
    socket.emit("updateScore2", newData);
  };

  const handleShowResult = () => {
    socket.emit("showResult2", "showResult");
  };

  const handleShowImage = (id: number) => {
    socket.emit("showImage2", id);
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
        <Button onClick={() => updateScore(record)}>Cập nhật</Button>
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
            <div className="flex gap-3">
              <Button onClick={handleGetListUser}>
                Lấy danh sách thí sinh
              </Button>

              <Button onClick={handleStart}>Bắt đầu tính thời gian</Button>
              <Button onClick={handleShowResult}>
                Hiện thị câu trả lời của thí sinh
              </Button>
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
                  onClick={() => handleGetQuestion(item.id)}
                >{`Câu hỏi số ${item.id}`}</Button>
                <Button
                  onClick={() => handleShowImage(item.id)}
                >{`Hiện thị câu trả lời ${item.id}`}</Button>
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
