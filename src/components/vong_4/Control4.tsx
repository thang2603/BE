import { useContext, useEffect, useState } from "react";
import { UserType, UserUpdateType } from "../../context/UserContext";
import { QuestionFourType } from "../../types/Login";
import { Button, Input, Table } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { convertScore, onChangeData } from "../../constants/until";

const Control4 = () => {
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const [listQuestion, setListQuestion] = useState<QuestionFourType[]>([]);
  const { socket } = useContext(SocketContext);
  const handleChangeData = (iduser: number, valueNumber: number) => {
    const newData = onChangeData(listUser, iduser, valueNumber);
    setListUser(newData);
  };
  useEffect(() => {
    socket.on("listUserServer4", (msg: UserType[]) => {
      console.log(msg);
      const newData = convertScore(msg);
      setListUser(newData);
    });
    socket.on("questionUserServer4", (msg: QuestionFourType[]) => {
      console.log(msg);
      setListQuestion([...msg]);
    });
    return () => {
      socket.off("listUserServer3");
    };
  }, [socket]);

  const handleGetListUser = () => {
    socket.emit("listUser4", "admin");
  };

  const handleQuestionByUser = (idUser: number) => {
    socket.emit("questionUser4", idUser);
  };

  const handleSendQuestion = (valueQues: QuestionFourType) => {
    socket.emit("sendQuestion4", valueQues);
  };
  const updateScore = () => {
    socket.emit("updateScore4", listUser);
  };

  const columnsUser = [
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
      title: "Cập nhật điểm",
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
    {
      title: "Lấy câu hỏi",
      dataIndex: "id",
      key: "id",
      render: (text: number, record: UserUpdateType) => (
        <Button onClick={() => handleQuestionByUser(text)}>Lấy câu hỏi</Button>
      ),
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text: number, record: QuestionFourType, index: number) => (
        <p>{index}</p>
      ),
    },
    {
      title: "Câu hỏi",
      dataIndex: "ques",
      key: "ques",
      render: (text: string, record: QuestionFourType, index: number) => (
        <p>{text}</p>
      ),
    },
    {
      title: "Câu trả lời",
      dataIndex: "ans",
      key: "ans",
      render: (text: number, record: QuestionFourType, index: number) => (
        <p>{text}</p>
      ),
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
      render: (text: number, record: QuestionFourType, index: number) => (
        <p>{text}</p>
      ),
    },
    {
      title: "Gửi câu hỏi",
      dataIndex: "id",
      key: "id",
      render: (text: number, record: QuestionFourType, index: number) => (
        <Button onClick={() => handleSendQuestion(record)}>Gửi câu hỏi</Button>
      ),
    },
  ];

  return (
    <div className="p-8 flex flex-col gap-2">
      <div className="flex gap-4">
        <Button onClick={handleGetListUser}>Danh sách thí sinh</Button>
        <Button onClick={updateScore}>Cập nhật điểm</Button>
      </div>
      <div className="flex gap-8 ">
        <Table columns={columnsUser} dataSource={listUser} pagination={false} />
        <Table columns={columns} dataSource={listQuestion} pagination={false} />
      </div>
    </div>
  );
};

export default Control4;
