import { UserType, UserUpdateType } from "../context/UserContext";

export const convertScore = (data: UserType[]) => {
  const newData: UserUpdateType[] = [...data]?.map((item) => ({
    ...item,
    updateScore: 0,
  }));
  return newData;
};

export const onChangeData = (
  data: UserUpdateType[],
  idUser: number,
  value: number
) => {
  const newData: UserUpdateType[] = [...data].map((item) =>
    item.id === idUser ? { ...item, updateScore: value } : item
  );
  return newData;
};
