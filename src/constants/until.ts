import { UserType, UserUpdateType } from "../context/UserContext";
import { LinkImageType } from "../types/Login";

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

export const convertOption = <T, K extends keyof T>(
  data: T[],
  fieldValue: K,
  fieldLabel: K
) => {
  const newData = data?.map((item) => ({
    value: item[fieldValue],
    label: item[fieldLabel],
  }));
  return newData;
};

export const createKey = (data: LinkImageType[]) => {
  if (data.length === 0) return 0;
  return data[data?.length - 1].id + 1;
};
