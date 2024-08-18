import { createContext, useMemo, useState } from "react";

export const UserContext = createContext<any>({});

interface UserContextProviderType {
  children: any;
}
export interface UserType {
  fullName: string;
  password: string;
  role: string;
  id: null | number;
  score: number;
}
export const INIT_USER: UserType = {
  score: 0,
  fullName: "",
  password: "",
  role: "",
  id: 0,
};
const getUser = () => {
  const storedValue = localStorage.getItem("user");
  const parsedValue: UserType = storedValue
    ? JSON.parse(storedValue)
    : INIT_USER;
  return parsedValue;
};
const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<UserType>(getUser());

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
