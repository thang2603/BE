import React, { ReactNode, useContext } from "react";

import { Button, Card, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

interface DataTypeProps {
  children: ReactNode;
}
const PageQuestion = ({ children }: DataTypeProps) => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handleNextWaitScreen = () => {
    socket.emit("nextWaitScreen");
  };

  const handleCreateData = () => {
    socket.emit("createTableDatabase");
  };

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleCreateData}>Tạo các bảng data</Button>
            <Button onClick={() => handleNavigate("/create/1")}>
              Tạo câu hỏi vòng 1 thi riêng
            </Button>
            <Button onClick={() => handleNavigate("/create/group/1")}>
              Tạo câu hỏi vòng 1 thi chung
            </Button>
            <Button onClick={() => handleNavigate("/create/2")}>
              Tạo câu hỏi vòng 2
            </Button>
            <Button onClick={() => handleNavigate("/create/3")}>
              Tạo câu hỏi vòng 3
            </Button>
            <Button onClick={() => handleNavigate("/create/4")}>
              Tạo câu hỏi vòng 4
            </Button>
            <Button onClick={() => handleNavigate("/createUser")}>
              Tạo tài khoản thí sinh
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => handleNavigate("/vong/1/control")}>
              Kĩ thuật vòng 1 thi riêng
            </Button>
            <Button onClick={() => handleNavigate("/vong/1/control")}>
              Kĩ thuật vòng 1 thi chung
            </Button>
            <Button onClick={() => handleNavigate("/vong/2/control")}>
              Kĩ thuật vòng 2
            </Button>
            <Button onClick={() => handleNavigate("/vong/3/control")}>
              Kĩ thuật vòng 3
            </Button>
            <Button onClick={() => handleNavigate("/vong/4/control")}>
              Kĩ thuật vòng 4
            </Button>
            <Popconfirm
              title="Bạn có muốn chuyển qua màn hình chờ không?"
              onConfirm={handleNextWaitScreen}
            >
              <Button>Chuyển qua màn hình chờ</Button>
            </Popconfirm>
          </div>
        </div>
      </Card>
      {children}
    </div>
  );
};

export default PageQuestion;
