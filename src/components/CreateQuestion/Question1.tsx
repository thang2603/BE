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
import { QuestionType } from "../../types/Login";

import { DefaultOptionType } from "antd/es/select";
import { UserType } from "../../context/UserContext";
import { convertOption } from "../../constants/until";
import { QuestionTypeBody } from "./../../types/Login";
import { INIT_QUESTION_BODY } from "../../constants/constants";

const Question1 = () => {
  const { socket } = useContext(SocketContext);
  const [listQuestion, setListQuestion] = useState<QuestionType[]>([]);
  const [listUser, setListUser] = useState<DefaultOptionType[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<QuestionType>({
    id: 0,
    ans: "",
    ques: "",
    idUser: 0,
    no: 0,
    quantity: 0,
    score: 0,
  });
  const [questionBody, setQuestionBody] =
    useState<QuestionTypeBody>(INIT_QUESTION_BODY);

  useEffect(() => {
    socket.emit("getAllQuestion", "getAllQuestion");
    socket.emit("listUser", "listUser");
    socket.on("listUserServer", (msg: UserType[]) => {
      setListUser(convertOption(msg, "id", "fullName"));
    });
    socket.on("getAllQuestionServer1", (msg: QuestionType[]) => {
      if (isOpenModal) handleCloseModal();
      setListQuestion([...msg]);
    });

    return () => {
      socket.off("listUserServer");
      socket.off("quesGame1Server");
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
  const handleSubmit = (
    value: QuestionTypeBody | QuestionType,
    key: string
  ) => {
    const check = handleCheckQuestion(value);
    if (check) {
      message.warning("Vui lòng điền đầy đủ thông tin câu hỏi");
    } else {
      socket.emit(key, value);
    }
  };

  const handleCheckQuestion = (value: QuestionTypeBody) => {
    const check = Object.keys(value).find(
      (item) => !!value?.[item as keyof QuestionTypeBody] === false
    );
    return !!check;
  };

  const handleOpenDetail = (value: QuestionType) => {
    setIsOpenModal(true);
    setDataDetail(value);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleDeleteQuestion = (idQues: number) => {
    socket.emit("deleteQuestion1", idQues);
  };
  const columns: TableProps<QuestionType>["columns"] = [
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
      title: "Thí sinh",
      dataIndex: "fullName",
      key: "fullName",
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
        <Form.Item label="Thí sinh" className="flex-1">
          <Select
            options={listUser}
            onChange={(e) => onChangeData(e, "idUser")}
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
      <Table columns={columns} dataSource={listQuestion} />

      <Modal
        open={isOpenModal}
        onOk={() => handleSubmit(dataDetail as QuestionType, "updateQuestion1")}
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
          <Form.Item label="Thí sinh" className="flex-1">
            <Select
              value={dataDetail?.idUser}
              options={listUser}
              onChange={(e) => onChangeDataEdit(e, "idUser")}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Question1;
