import { api } from '../../lib/axios';

export type GetConversationResponse = {
  conversation: {
    id: 1;
    createdAt: Date;
    participants: {
      id: string;
      name: string;
      status: 'ONLINE' | 'OFFLINE';
    }[];
    messages: {
      id: number;
      text: string;
      createdAt: Date;
      user: {
        id: string;
        name: string;
      };
    }[];
  };
};

export async function getConversation(id: string) {
  const { data } = await api.get<GetConversationResponse>(
    `/conversation/${id}`,
  );

  console.log('data: ', data.conversation);

  return data.conversation;
}
