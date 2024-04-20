import { api } from '../../lib/axios';

export type CreateUserResponse = {
  user: {
    user: {
      id: string;
      name: string;
      email: string;
      hashedPassword: string;
      status: 'ONLINE' | 'OFFLINE';
      createdAt: Date;
    };
  };
};

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const { data } = await api.post<CreateUserResponse>(`/users/`, {
    name,
    email,
    password,
  });

  console.log('data: ', data.user.user);

  return data.user.user;
}
