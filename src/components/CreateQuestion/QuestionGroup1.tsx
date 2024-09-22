import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  TableProps,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { QuestionGroupType, QuestionType } from "../../types/Login";
import { QuestionTypeBody } from "./../../types/Login";

const QuestionGroup1 = () => {
  const { socket } = useContext(SocketContext);
  const [listQuestion, setListQuestion] = useState<QuestionGroupType[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<QuestionGroupType>({
    id: 1,
    ans: "",
    ques: "",
    no: 1,
  });
  const [questionBody, setQuestionBody] = useState<QuestionGroupType>({
    id: 1,
    ans: "",
    ques: "",
    no: 1,
  });

  useEffect(() => {
    socket.emit("getAllQuestionGroup1", "getAllQuestionGroup1");
    socket.on("getAllQuestionGroupServer1", (msg: QuestionType[]) => {
      handleCloseModal();
      setListQuestion([...msg]);
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  const onChangeData = (
    value: string | number,
    field: keyof QuestionTypeBody
  ) => {
    setQuestionBody((pre) => ({ ...pre, [field]: value }));
  };

  const onChangeDataEdit = (
    value: string | number,
    field: keyof QuestionType
  ) => {
    setDataDetail((pre) => ({ ...pre, [field]: value }));
  };
  const handleSubmit = (value: QuestionGroupType, key: string) => {
    const check = handleCheckQuestion(value);
    if (check) {
      message.warning("Vui lòng điền đầy đủ thông tin câu hỏi");
    } else {
      socket.emit(key, value);
    }
  };

  const handleCheckQuestion = (value: QuestionGroupType) => {
    const check = Object.keys(value).find(
      (item) => !!value?.[item as keyof QuestionGroupType] === false
    );
    return !!check;
  };

  const handleOpenDetail = (value: QuestionGroupType) => {
    setIsOpenModal(true);
    setDataDetail(value);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleDeleteQuestion = (idQues: number) => {
    socket.emit("deleteQuestionGroup1", idQues);
  };
  const columns: TableProps<QuestionGroupType>["columns"] = [
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
      title: "Số thự tự câu hỏi",
      dataIndex: "no",
      key: "no",
      width: 150,
    },
    {
      title: "Hành động",
      dataIndex: "no",
      key: "no",
      width: 250,
      render: (value, record, index) => (
        <div className="flex gap-2 flex-wrap">
          <Button type="primary" onClick={() => handleOpenDetail(record)}>
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có muốn xóa câu hỏi này không?"
            onConfirm={() => handleDeleteQuestion(record?.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card title="Vòng 1">
      <Form
        name="basic"
        className="flex  w-full justify-center flex-wrap flex-col"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="Câu hỏi" className="flex-1">
          <Input onChange={(e) => onChangeData(e.target.value, "ques")}></Input>
        </Form.Item>
        <Form.Item label="Câu trả lời" className="flex-1">
          <Input onChange={(e) => onChangeData(e.target.value, "ans")}></Input>
        </Form.Item>
        <Form.Item label="Câu hỏi số" className="flex-1">
          <Input
            type="number"
            max={12}
            min={1}
            onChange={(e) => onChangeData(Number(e.target.value), "no")}
          ></Input>
        </Form.Item>

        <Form.Item label="" className="flex-1 flex justify-center">
          <Button
            className="w-48"
            onClick={() =>
              handleSubmit(questionBody, "createAllQuestionGroup1")
            }
          >
            Tạo câu hỏi
          </Button>
        </Form.Item>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={listQuestion}
        pagination={false}
        scroll={{ y: "calc(100vh - 300px)" }}
      />

      <Modal
        open={isOpenModal}
        onCancel={handleCloseModal}
        onOk={() =>
          handleSubmit(dataDetail as QuestionType, "updateAllQuestionGroup1")
        }
      >
        <Form
          name="basic"
          className="flex  w-full justify-center flex-wrap flex-col"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item label="Câu hỏi" className="flex-1">
            <Input
              onChange={(e) => onChangeDataEdit(e.target.value, "ques")}
              value={dataDetail?.ques}
            ></Input>
          </Form.Item>
          <Form.Item label="Câu trả lời" className="flex-1">
            <Input
              value={dataDetail?.ans}
              onChange={(e) => onChangeDataEdit(e.target.value, "ans")}
            ></Input>
          </Form.Item>
          <Form.Item label="Câu hỏi số" className="flex-1">
            <Input
              value={dataDetail?.no}
              type="number"
              max={12}
              min={1}
              onChange={(e) => onChangeDataEdit(Number(e.target.value), "no")}
            ></Input>
          </Form.Item>
          <Form.Item label="Thí sinh" className="flex-1"></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default QuestionGroup1;
