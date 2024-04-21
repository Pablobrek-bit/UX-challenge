import { api } from '../../lib/axios';

export async function joinRoom(id: number, password?: string) {
  if (password) {
    api.put(`/room/join/${id}`, { password });
    return;
  }

  api.put(`/room/join/${id}`);
}
