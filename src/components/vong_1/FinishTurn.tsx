import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./FinishTurn.css";
import { UserType } from "../../context/UserContext";
const FinishTurn = () => {
  const { socket } = useContext(SocketContext);
  const [listUser, setListUser] = useState<UserType[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    socket.emit("finishTurnUser", "finish");
    audioRef?.current?.play().catch((error) => {
      console.log("Playback prevented:", error);
    });
    socket.on("finishTurnUserServer", (msg: UserType[]) => {
      console.log(2);
      setListUser([...msg]);
    });

    // return () => {
    //   socket.off();
    // };
  }, [socket]);

  return (
    <div className="container">
      {listUser.map((item) => (
        <div className="relative elementVong1" key={item.id}>
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
      <div className="absolute">
        <audio ref={audioRef} src="/vong1/FinishTurn.mp3" />
      </div>
    </div>
  );
};

export default FinishTurn;
