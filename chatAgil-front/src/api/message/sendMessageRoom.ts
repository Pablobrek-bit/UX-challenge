import { api } from '../../lib/axios';

type SendMessageParams = {
  message: string;
  roomId: string;
};

export async function sendMessageRoom({ message, roomId }: SendMessageParams) {
  await api.post(`/message/room/${roomId}`, { message });
}
