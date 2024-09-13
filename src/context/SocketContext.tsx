import { createContext } from "react";
import socketio from "socket.io-client";
const SOCKET_URL = `http://${process.env.REACT_APP_SERVER_IP}:4000`;
export const socket = socketio(SOCKET_URL);
export const SocketContext = createContext<any>({});

interface SocketContextProviderType {
  children: any;
}
const SocketContextProvider = ({ children }: SocketContextProviderType) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
