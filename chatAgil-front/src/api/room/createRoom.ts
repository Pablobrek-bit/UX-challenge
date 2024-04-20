import { api } from '../../lib/axios';

export type CreateRoomResponse = {
  id: number;
  name: string;
  password: string;
  createdAt: Date;
};

export async function createRoom(name: string, password?: string) {
  const { data } = await api.post<CreateRoomResponse>(`/room/`, {
    name,
    password,
  });

  return data;
}
