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
import { QuestionType, QuestionType2 } from "../../types/Login";

import { DefaultOptionType } from "antd/es/select";
import { UserType } from "../../context/UserContext";
import { convertOption } from "../../constants/until";
import { QuestionTypeBody } from "./../../types/Login";

const INIT_QUESTION_2: QuestionType2 = {
  id: 0,
  ans: "",
  ques: "",
  type: 1,
  no: 0,
  isActive: 0,
};

const OPTION_TYPE_QUESTION = [
  {
    value: 1,
    label: "Câu hỏi chữ",
  },
  {
    value: 2,
    label: "Câu hỏi âm thanh",
  },
];
const Question2 = () => {
  const { socket } = useContext(SocketContext);
  const [listQuestion, setListQuestion] = useState<QuestionType2[]>([]);
  const [listUser, setListUser] = useState<DefaultOptionType[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<QuestionType2>(INIT_QUESTION_2);
  const [questionBody, setQuestionBody] =
    useState<QuestionType2>(INIT_QUESTION_2);

  useEffect(() => {
    socket.emit("getAllQuestion2", "getAllQuestion2");
    socket.emit("listUser", "listUser");
    socket.on("listUserServer", (msg: UserType[]) => {
      setListUser(convertOption(msg, "id", "fullName"));
    });
    socket.on("getAllQuestionServer2", (msg: QuestionType2[]) => {
      if (isOpenModal) handleCloseModal();
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
    field: keyof QuestionType2
  ) => {
    setDataDetail((pre) => ({ ...pre, [field]: value }));
  };
  const handleSubmit = (value: QuestionType2, key: string) => {
    const check = handleCheckQuestion(value);
    if (check) {
      message.warning("Vui lòng điền đầy đủ thông tin câu hỏi");
    } else {
      socket.emit(key, value);
    }
  };

  const handleCheckQuestion = (value: QuestionType2) => {
    const check = Object.keys(value).find(
      (item) => !!value?.[item as keyof QuestionType2] === false
    );
    return !!check;
  };

  const handleOpenDetail = (value: QuestionType2) => {
    setIsOpenModal(true);
    setDataDetail(value);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleDeleteQuestion = (idQues: number) => {
    socket.emit("deleteQuestion1", idQues);
  };
  const columns: TableProps<QuestionType2>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
      width: 100,
    },
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
      render: (text) => <span>{text}</span>,
      width: 150,
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
            max={6}
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
            onClick={() => handleSubmit(questionBody, "createQuestion1")}
          >
            Tạo câu hỏi
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={listQuestion} bordered />

      <Modal
        open={isOpenModal}
        onOk={() =>
          handleSubmit(dataDetail as QuestionType2, "updateQuestion1")
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
              max={6}
              min={1}
              onChange={(e) => onChangeDataEdit(Number(e.target.value), "no")}
            ></Input>
          </Form.Item>
          <Form.Item label="Thể loại" className="flex-1">
            <Select
              value={dataDetail?.type}
              options={listUser}
              onChange={(e) => onChangeDataEdit(e, "type")}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Question2;
