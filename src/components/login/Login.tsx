import { Button, Form, Input, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserType } from "../../context/UserContext";
import { INIT_USER } from "./../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [login, setLogin] = useState<UserType>({
    ...INIT_USER,
  });

  const onChangeData = (field: keyof UserType, value: string) => {
    setLogin((pre) => ({ ...pre, [field]: value }));
  };

  const handleSubmit = () => {
    if (login.fullName && login?.password) socket.emit(`login`, login);
    else {
      message.warning("Vui lòng nhập đầy đủ thông tin");
    }
  };

  useEffect(() => {
    socket.on("userInfor", (msg: UserType[]) => {
      if (msg?.length > 0) {
        localStorage.setItem("user", JSON.stringify(msg[0]));
        if (msg[0].role === "ADMIN") {
          navigate("/vong/1/control");
        } else {
          navigate("/vong/1/user");
        }
        setUser(msg[0]);
      } else {
        message.warning("Tài khoản hoặc mật khẩu không chính xác");
      }
    });

    return () => {
      socket.off("userInfor");
    };
  }, [socket, setUser, navigate]);
  return (
    <div className="w-screen h-screen  flex justify-center items-center flex-col">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={(e) => onChangeData("fullName", e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input onChange={(e) => onChangeData("password", e.target.value)} />
        </Form.Item>
      </Form>

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Login;
