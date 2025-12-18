import { IUser } from "../../types/user/userTypes";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async (): Promise<IUser[]> => {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al cargar usuarios");
  }

  return response.json();
};

export const getUserById = async (id: string): Promise<IUser> => {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al cargar el usuario");
  }

  return response.json();
};