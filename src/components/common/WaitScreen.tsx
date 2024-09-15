import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./WaitScreen.css";
const WaitScreen = () => {
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("listQuestionServer2", (msg: string) => {});
  }, [socket]);
  return (
    <div className="container">
      <div className="relative element">
        <div className="border-2 border-solid border-slate-200  bg-sky-800 h-1/2 px-4 py-6">
          <p className="text-white font-semibold text-2xl h-8">100</p>
        </div>
        <div className="absolute bg-cyan-600 text-white -top-4 left-2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
          <p>Thí sinh 1</p>
        </div>
      </div>
      <div className="relative element">
        <div className="border-2 border-solid border-slate-200  bg-sky-800 h-1/2 px-4 py-6">
          <p className="text-white font-semibold text-2xl h-8">100</p>
        </div>
        <div className="absolute bg-cyan-600 text-white -top-4 left-2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
          <p>Thí sinh 2</p>
        </div>
      </div>
      <div className="relative element">
        <div className="border-2 border-solid border-slate-200  bg-sky-800 h-1/2 px-4 py-6">
          <p className="text-white font-semibold text-2xl h-8">100</p>
        </div>
        <div className="absolute bg-cyan-600 text-white -top-4 left-2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
          <p>Thí sinh 3</p>
        </div>
      </div>
      <div className="relative element">
        <div className="border-2 border-solid border-slate-200  bg-sky-800 h-1/2 px-4 py-6">
          <p className="text-white font-semibold text-2xl h-8">100</p>
        </div>
        <div className="absolute bg-cyan-600 text-white -top-4 left-2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
          <p>Thí sinh 4</p>
        </div>
      </div>
    </div>
  );
};

export default WaitScreen;
