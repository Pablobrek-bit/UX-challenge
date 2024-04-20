import { StatusVariant } from '../../components/Status';
import { api } from '../../lib/axios';

export type getRoomResponse = {
  id: number;
  name: string;
  password: string;
  createdAt: string;
  users: {
    id: string;
    name: string;
    status: StatusVariant['variant'];
  }[];
  Message: {
    id: number;
    text: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
    };
  }[];
};

export async function getRoom(id: number) {
  const { data } = await api.get<getRoomResponse>(`/room/${id}`);

  return data;
}
