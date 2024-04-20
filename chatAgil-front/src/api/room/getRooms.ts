import { api } from '../../lib/axios';

export type getRoomsResponse = {
  id: number;
  name: string;
  password: string | null;
  createdAt: Date;
};

export async function getRooms() {
  const { data } = await api.get<getRoomsResponse[]>('/room/');

  return data;
}
