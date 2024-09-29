import { useContext, useEffect, useState } from "react";
import { UserType, UserUpdateType } from "../../context/UserContext";
import { QuestionFourType } from "../../types/Login";
import { Button, Checkbox, Input, Table } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { convertScore, onChangeData } from "../../constants/until";

export const INIT_OPTION = [20, 20, 20];
const Control4 = () => {
  const [listUser, setListUser] = useState<UserUpdateType[]>([]);
  const [listQuestion, setListQuestion] = useState<QuestionFourType[]>([]);
  const { socket } = useContext(SocketContext);
  const [listUserGame5, setListUserGame5] = useState<number[]>([]);
  const [option, setOption] = useState<number[]>(INIT_OPTION);
  const handleChangeData = (iduser: number, valueNumber: number) => {
    const newData = onChangeData(listUser, iduser, valueNumber);
    setListUser(newData);
  };
  useEffect(() => {
    socket.on("listUserServer4", (msg: UserType[]) => {
      const newData = convertScore(msg);
      setListUser(newData);
    });
    socket.on("questionUserServer4", (msg: QuestionFourType[]) => {
      setListQuestion([...msg]);
    });
    socket.on("listUserGameServer5", (msg: number[]) => {
      setListUserGame5([...msg]);
    });
    return () => {
      socket.off();
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

  const handleStartTime = () => {
    socket.emit("startTime4", listUser);
  };

  const handleFinishTurn = () => {
    socket.emit("finishTurn4", listUser);
  };
  const handleStar = (idUser: number) => {
    socket.emit("start", idUser);
  };

  const handleCancelStar = () => {
    socket.emit("cancelStart");
  };

  const handleSendUserGame5 = (idUser: number, value: boolean) => {
    if (value) {
      socket.emit("addUserGame5", idUser);
    } else {
      socket.emit("deleteUserGame5", idUser);
    }
  };

  const handleChangOption = (value: number, numberOption: number) => {
    const newData = [...option].map((item, index) =>
      index === numberOption ? value : item
    );
    socket.emit("optionQuestion4", newData);
    setOption([...newData]);
  };

  const handleStartTurn = () => {
    socket.emit("startTurn4", "start");
  };

  const handleCorrectFinish = () => {
    socket.emit("correctFinish4", "start");
  };
  const handleWrongFinish = () => {
    socket.emit("wrongFinish4", "start");
  };

  const handleCheckListUserGame5 = (idUser: number) => {
    const isCheck = listUserGame5.find((item) => item === idUser);
    return !!isCheck;
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
    {
      title: "Ngôi sao hi vọng",
      dataIndex: "id",
      key: "id",
      render: (text: number, record: UserUpdateType) => (
        <Button onClick={() => handleStar(text)}>Ngôi sao hi vọng</Button>
      ),
    },
    {
      title: "Chọn thí sinh",
      dataIndex: "id",
      key: "id",
      render: (text: number, record: UserUpdateType) => (
        <Checkbox
          checked={handleCheckListUserGame5(text)}
          onChange={(e) => handleSendUserGame5(record.id, e.target.checked)}
        />
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
        <div>
          <div>
            <Button onClick={handleStartTurn}>Bắt đầu lượt thi</Button>
            <Button onClick={handleCorrectFinish}>Trả lời đúng</Button>
            <Button onClick={handleWrongFinish}>Trả lời sai</Button>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleGetListUser}>Danh sách thí sinh</Button>
            <Button onClick={updateScore}>Cập nhật điểm</Button>
            <Button onClick={handleCancelStar}>Huỷ ngôi sao hi vọng</Button>
            <Button onClick={handleStartTime}>Bắt đầu tính thời gian</Button>
            <Button onClick={handleFinishTurn}>Kết thúc lượt thi</Button>
          </div>
        </div>

        <div className="flex gap-8 bg-slate-50 p-5 rounded-lg">
          {option.map((item, index) => (
            <div className="flex items-center gap-2 ">
              <p>Câu {index + 1}</p>
              <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                  <span>20</span>
                  <Checkbox
                    checked={item === 20}
                    onChange={() => handleChangOption(20, index)}
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <span>30</span>
                  <Checkbox
                    checked={item === 30}
                    onChange={() => handleChangOption(30, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-8 flex-col ">
        <Table columns={columnsUser} dataSource={listUser} pagination={false} />
        <Table columns={columns} dataSource={listQuestion} pagination={false} />
      </div>
    </div>
  );
};

export default Control4;
