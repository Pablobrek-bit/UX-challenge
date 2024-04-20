import { StatusVariant } from '../../components/Status';
import { api } from '../../lib/axios';

export type UserStatusInfo = {
  users: {
    id: string;
    name: string;
    status: StatusVariant;
  }[];
};

export async function getOnUsers() {
  const data = await api.get<UserStatusInfo>(`/users/on`);

  return data.data.users;
}
