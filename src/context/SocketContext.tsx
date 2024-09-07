import { createContext } from "react";
import socketio from "socket.io-client";
const SOCKET_URL = "http://192.168.1.8:4000";
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
