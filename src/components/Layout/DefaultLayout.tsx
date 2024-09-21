import { Image } from "antd";
import { useState } from "react";

const DefaultLayout = ({ children }: any) => {
  const [color, setColor] = useState("");
  const handleChangeColor = () => {
    if (!color) {
      setColor("bg-green-600");
    } else {
      setColor("");
    }
  };
  return (
    <div className={color}>
      <div className="absolute p-0 m-0 left-0">
        <Image
          src="/logo/truong1.png"
          preview={false}
          width={120}
          onClick={handleChangeColor}
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
