import { Image } from "antd";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { notification } from "antd";
import { SocketContext } from "../../context/SocketContext";

const DefaultLayout = ({ children }: any) => {
  const [color, setColor] = useState("");
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [api, contextHolder] = notification.useNotification();

  const handleChangeColor = () => {
    if (!color) {
      setColor("bg-green-600");
    } else {
      setColor("");
    }
  };

  useEffect(() => {
    socket.on("sendMessFromTechServer", (msg: string) => {
      if (user?.role === "MC") {
        api.open({
          message: msg,
          duration: 0,
        });
      }
    });
  }, [socket, api, user]);
  return (
    <div className={color}>
      {contextHolder}
      <div className="absolute p-0 m-0 left-0">
        <Image
          src="/logo/truong1.png"
          preview={false}
          width={120}
          onDoubleClick={handleChangeColor}
        ></Image>
      </div>
      <div className="absolute p-0 right-0">
        <Image src="/logo/CLB1.png" preview={false} width={120}></Image>
        <Image src="/logo/san1.png" preview={false} width={120}></Image>
      </div>

      {children}
    </div>
  );
};

export default DefaultLayout;
