export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  status: 'ONLINE' | 'OFFLINE';
  created_at: Date;
};
