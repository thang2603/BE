import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserType, UserTypeBody } from "../../context/UserContext";
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

const LIST_ROLE = [
  {
    label: "Thí sinh",
    value: "USER",
  },
  {
    label: "Kĩ thuật",
    value: "ADMIN",
  },
  {
    label: "Dẫn chương trình",
    value: "MC",
  },
  {
    label: "Khán giả",
    value: "WATCH",
  },
];

const INIT_USER_DEFAUT: UserTypeBody = {
  id: 1,
  fullName: "",
  password: "",
  role: "",
};
const CreateUser = () => {
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserTypeBody[]>([]);
  const [dataDetail, setDataDetail] = useState<UserTypeBody>(INIT_USER_DEFAUT);
  const [questionBody, setQuestionBody] =
    useState<UserTypeBody>(INIT_USER_DEFAUT);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  useEffect(() => {
    socket.emit("listUserService", "listUserServiceServer");
    socket.on("listUserServiceServer", (msg: UserType[]) => {
      handleCloseModal();
      setListUser([...msg]);
    });

    return () => {
      socket.off("listUserService");
      socket.off("quesGame1Server");
    };
  }, [socket]);

  const handleOpenDetail = (value: UserTypeBody) => {
    setIsOpenModal(true);
    setDataDetail(value);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleDeleteUser = (idUser: number) => {
    socket.emit("deleteUserService", idUser);
  };

  const handleCheckQuestion = (value: UserTypeBody) => {
    const check = Object.keys(value).find(
      (item) => !!value?.[item as keyof UserTypeBody] === false
    );
    return !!check;
  };

  const onChangeDataEdit = (value: string | number, field: keyof UserType) => {
    setDataDetail((pre) => ({ ...pre, [field]: value }));
  };
  const handleSubmit = (value: UserTypeBody, key: string) => {
    const check = handleCheckQuestion(value);
    if (check) {
      message.warning("Vui lòng điền đầy đủ thông tin câu hỏi");
    } else {
      socket.emit(key, value);
    }
  };
  const onChangeData = (value: string | number, field: keyof UserType) => {
    setQuestionBody((pre) => ({ ...pre, [field]: value }));
  };
  const columns: TableProps<UserTypeBody>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tài khoản",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      key: "role",
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
            onConfirm={() => handleDeleteUser(record?.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card title="Tạo tài khoản">
        <Form
          name="basic"
          className="flex  w-full justify-center flex-wrap flex-col"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item label="Tài khoản" className="flex-1">
            <Input
              onChange={(e) => onChangeData(e.target.value, "fullName")}
            ></Input>
          </Form.Item>
          <Form.Item label="Mật khẩu" className="flex-1">
            <Input
              onChange={(e) => onChangeData(e.target.value, "password")}
            ></Input>
          </Form.Item>

          <Form.Item label="Phân quyền" className="flex-1">
            <Select
              options={LIST_ROLE}
              onChange={(e) => onChangeData(e, "role")}
            ></Select>
          </Form.Item>

          <Form.Item label="" className="flex-1 flex justify-center">
            <Button
              className="w-48"
              onClick={() => handleSubmit(questionBody, "createUserService")}
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={listUser} />

        <Modal
          open={isOpenModal}
          onCancel={handleCloseModal}
          onOk={() => handleSubmit(dataDetail as UserType, "updateUserService")}
        >
          <Form
            name="basic"
            className="flex  w-full justify-center flex-wrap flex-col"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Tài khoản" className="flex-1">
              <Input
                value={dataDetail?.fullName}
                onChange={(e) => onChangeDataEdit(e.target.value, "fullName")}
              ></Input>
            </Form.Item>
            <Form.Item label="Mật khẩu" className="flex-1">
              <Input
                value={dataDetail?.password}
                onChange={(e) => onChangeDataEdit(e.target.value, "password")}
              ></Input>
            </Form.Item>

            <Form.Item label="Phân quyền" className="flex-1">
              <Select
                value={dataDetail?.role}
                options={LIST_ROLE}
                onChange={(e) => onChangeDataEdit(e, "role")}
              ></Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default CreateUser;
