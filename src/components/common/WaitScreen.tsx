import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./WaitScreen.css";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../context/UserContext";
const WaitScreen = () => {
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserType[]>([]);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    socket.emit("showResultWaiterScreen", "score");

    audioRef?.current?.play().catch((error) => {
      console.log("Playback prevented:", error);
    });
    socket.on("showResultWaiterScreenServer", (msg: UserType[]) => {
      setListUser([...msg]);
    });
    socket.on("nextGameFromSever", (msg: string) => {
      navigate(msg);
    });

    return () => {
      socket.off();
    };
  }, [socket, navigate]);

  return (
    <div className="container">
      {listUser.map((item) => (
        <div className="relative element" key={item.id}>
          <div className="border-2 border-solid border-slate-200  baseColor h-1/2 px-4 py-6">
            <p className="text-white font-semibold text-2xl h-8">
              {item?.score || 0}
            </p>
          </div>
          <div className="absolute bg-cyan-600 text-white -top-4 left-2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
            <p>{item.fullName}</p>
          </div>
        </div>
      ))}
      <audio ref={audioRef} src="/vong1/PointSummary.mp3" />
    </div>
  );
};

export default WaitScreen;
