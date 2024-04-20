import { api } from '../../lib/axios';

export type isUserInRoomResponse = {
  userInRoom: boolean;
};

export async function isUserInRoom(id: number) {
  const { data } = await api.get<isUserInRoomResponse>(
    `/room/user-in-room/${id}`,
  );
  console.log(data.userInRoom);

  return data.userInRoom;
}
