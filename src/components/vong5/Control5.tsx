import { Button, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";

import { QuestionType5 } from "../CreateQuestion/Question5";

const Control5 = () => {
  const { socket } = useContext(SocketContext);
  const [listQuestion, setListQuestion] = useState<QuestionType5[]>([]);

  const handleNextQuestion = (noQues: number) => {
    socket.emit("quesGame5", noQues);
  };
  const columns = [
    {
      title: "Câu hỏi",
      dataIndex: "ques",
      key: "ques",
    },
    {
      title: "Câu trả lời",
      dataIndex: "ans",
      key: "ans",
    },
    {
      title: "Thứ tự câu hỏi",
      dataIndex: "no",
      key: "no",
      width: 150,
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      width: 170,
      render: (text: number, record: QuestionType5) => (
        <Button onClick={() => handleNextQuestion(record.no)}>
          Gửi câu hỏi
        </Button>
      ),
    },
  ];
  useEffect(() => {
    socket.emit("listQuestion5", "listQuestion5");
    socket.on("listQuestionServer5", (msg: QuestionType5[]) => {
      setListQuestion([...msg]);
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  return (
    <div className="p-8">
      <Table columns={columns} dataSource={listQuestion} />;
    </div>
  );
};

export default Control5;
