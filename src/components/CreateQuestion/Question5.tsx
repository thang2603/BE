import { Button, Card, Form, Input, message, Modal, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";

export interface QuestionType5 {
  id?: number;
  ques: string;
  ans: string;
  no: number;
}
const INIT_QUESTION_5: QuestionType5 = {
  id: 0,
  ques: "",
  ans: "",
  no: 1,
};
const Question5 = () => {
  const { socket } = useContext(SocketContext);
  const [listQuestion, setListQuestion] = useState<QuestionType5[]>([]);
  const [data, setData] = useState<QuestionType5>(INIT_QUESTION_5);

  const [dataDetail, setDataDetail] = useState<QuestionType5>(INIT_QUESTION_5);
  useEffect(() => {
    socket.emit("listQuestion5", "listQuestion5");
    socket.on("listQuestionServer5", (msg: QuestionType5[]) => {
      setListQuestion([...msg]);
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  const handleCheckQuestion = (value: QuestionType5) => {
    if (!value?.ques || !value?.no || !value?.ans) {
      message.warning("Vui lòng điền đầy đủ thông tin câu hỏi");
      return false;
    }
    return true;
  };

  const handleSubmitQuestion = () => {
    const isCheck = handleCheckQuestion(data);

    if (isCheck) socket.emit("creatQuestion5", data);
  };

  const onChangeData = (value: string | number, field: keyof QuestionType5) => {
    setData((pre) => ({ ...pre, [field]: value }));
  };
  const onChangeDataDetail = (
    value: string | number,
    field: keyof QuestionType5
  ) => {
    setDataDetail((pre) => ({ ...pre, [field]: value }));
  };
  const handleDeleteQuestion = (idQues: number) => {
    socket.emit("deleteQuestion5", idQues);
  };

  const handleUpdateQuestion = () => {
    const isCheck = handleCheckQuestion(dataDetail);
    if (isCheck) {
      socket.emit("updateQuestion5", dataDetail);
      setDataDetail(INIT_QUESTION_5);
    }
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
        <div className=" flex gap-2">
          <Button onClick={() => setDataDetail(record)}>Chỉnh sửa</Button>
          <Button onClick={() => handleDeleteQuestion(text)}>Delete</Button>
        </div>
      ),
    },
  ];
  return (
    <div className="p-9 flex flex-col gap-5">
      <Card title="Tạo câu hỏi vòng 5">
        <Form
          name="basic"
          className="flex  w-full justify-center flex-wrap flex-col"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item label="Câu hỏi">
            <Input onChange={(e) => onChangeData(e.target.value, "ques")} />
          </Form.Item>
          <Form.Item label="Câu trả lời">
            <Input onChange={(e) => onChangeData(e.target.value, "ans")} />
          </Form.Item>
          <Form.Item label="Thứ tự câu hỏi">
            <Input
              min={1}
              max={3}
              type="number"
              onChange={(e) => onChangeData(Number(e.target.value), "no")}
            />
          </Form.Item>
        </Form>
        <div className="flex justify-center">
          <Button onClick={handleSubmitQuestion}>Tạo câu hỏi</Button>
        </div>
      </Card>

      <Table columns={columns} dataSource={listQuestion} />

      <Modal
        open={!!dataDetail?.id}
        onCancel={() => setDataDetail(INIT_QUESTION_5)}
        onOk={handleUpdateQuestion}
        okText="Chỉnh sửa"
        cancelText="Đóng"
        width={800}
        closeIcon={false}
      >
        <div>
          <Form
            name="basic"
            className="flex  w-full justify-center flex-wrap flex-col"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Câu hỏi">
              <Input
                value={dataDetail.ques}
                onChange={(e) => onChangeDataDetail(e.target.value, "ques")}
              />
            </Form.Item>
            <Form.Item label="Câu trả lời">
              <Input
                value={dataDetail?.ans}
                onChange={(e) => onChangeDataDetail(e.target.value, "ans")}
              />
            </Form.Item>
            <Form.Item label="Thứ tự câu hỏi">
              <Input
                value={dataDetail?.no}
                min={1}
                max={3}
                type="number"
                onChange={(e) =>
                  onChangeDataDetail(Number(e.target.value), "no")
                }
              />
            </Form.Item>
          </Form>
          <div className="flex justify-center">
            <Button onClick={handleSubmitQuestion}>Tạo câu hỏi</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Question5;
