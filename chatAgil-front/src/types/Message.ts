export type Message = {
  id: number;
  text: string;
  userId: string;
  createdAt: Date;
  user: {
    name: string;
  };
};
