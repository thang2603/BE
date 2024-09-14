import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  TableProps,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { QuestionType2, QuestionType3 } from "../../types/Login";

const INIT_QUESTION_3: QuestionType3 = {
  id: 1,
  ans: "",
  ques: "",
  type: 1,
  no: 1,
};

const OPTION_TYPE_QUESTION = [
  {
    value: 1,
    label: "Câu hỏi hình ảnh",
  },
  {
    value: 2,
    label: "Câu hỏi video",
  },
];
const Question3 = () => {
  const { socket } = useContext(SocketContext);
  const [listQuestion, setListQuestion] = useState<QuestionType3[]>([]);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<QuestionType3>(INIT_QUESTION_3);
  const [questionBody, setQuestionBody] =
    useState<QuestionType3>(INIT_QUESTION_3);

  useEffect(() => {
    socket.emit("getAllQuestion3", "getAllQuestion3");
    socket.on("getAllQuestionServer3", (msg: QuestionType3[]) => {
      handleCloseModal();
      setListQuestion([...msg]);
    });

    return () => {
      socket.off("listUserServer");
      socket.off("quesGame1Server");
    };
  }, [socket]);

  const onChangeData = (value: string | number, field: keyof QuestionType2) => {
    setQuestionBody((pre) => ({ ...pre, [field]: value }));
  };

  const onChangeDataEdit = (
    value: string | number,
    field: keyof QuestionType3
  ) => {
    setDataDetail((pre) => ({ ...pre, [field]: value }));
  };
  const handleSubmit = (value: QuestionType3, key: string) => {
    const check = handleCheckQuestion(value);
    if (check) {
      message.warning("Vui lòng điền đầy đủ thông tin câu hỏi");
    } else {
      socket.emit(key, value);
    }
  };

  const handleCheckQuestion = (value: QuestionType3) => {
    const check = Object.keys(value).find(
      (item) =>
        item !== "isActive" && !!value?.[item as keyof QuestionType3] === false
    );
    return !!check;
  };

  const handleOpenDetail = (value: QuestionType3) => {
    setIsOpenModal(true);
    setDataDetail(value);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleDeleteQuestion = (idQues: number) => {
    socket.emit("deleteQuestion3", idQues);
  };

  const columns: TableProps<QuestionType3>["columns"] = [
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
      title: "Thể loại câu hỏi",
      dataIndex: "type",
      key: "type",
      render: (text) => <span>{OPTION_TYPE_QUESTION[text - 1].label}</span>,
      width: 180,
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
    <Card title="Vòng 3">
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
            max={4}
            min={1}
            onChange={(e) => onChangeData(Number(e.target.value), "no")}
          ></Input>
        </Form.Item>
        <Form.Item label="Thể loại" className="flex-1">
          <Select
            options={OPTION_TYPE_QUESTION}
            onChange={(e) => onChangeData(e, "type")}
          ></Select>
        </Form.Item>
        <Form.Item label="" className="flex-1 flex justify-center">
          <Button
            className="w-48"
            onClick={() => handleSubmit(questionBody, "createQuestion3")}
          >
            Tạo câu hỏi
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={listQuestion} bordered />

      <Modal
        open={isOpenModal}
        onOk={() =>
          handleSubmit(dataDetail as QuestionType2, "updateQuestion3")
        }
        onCancel={handleCloseModal}
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
              max={4}
              min={1}
              onChange={(e) => onChangeDataEdit(Number(e.target.value), "no")}
            ></Input>
          </Form.Item>
          <Form.Item label="Thể loại" className="flex-1">
            <Select
              value={dataDetail?.type}
              options={OPTION_TYPE_QUESTION}
              onChange={(e) => onChangeDataEdit(e, "type")}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Question3;
