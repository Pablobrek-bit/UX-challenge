import { ComponentProps, useEffect, useState } from 'react';
import { Title } from '../components/Title';
import { UserStatusInfo, getOnUsers } from '../api/user/getOnUsers';
import { User } from '../components/User';
import { useAuth } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { createConversation } from '../api/conversation/createConversation';

interface OnlineUsersProps extends ComponentProps<'div'> {}

export function OnlineUsers({ ...props }: OnlineUsersProps) {
  const [users, setUsers] = useState<UserStatusInfo['users']>([]);
  const { user } = useAuth();

  const navigate = useNavigate();

  async function handleUserClick(id: string) {
    await createConversation(id ?? '');
    navigate(`/mensagens/conversation/${id}`);
  }

  useEffect(() => {
    async function fetchUsers() {
      const data = await getOnUsers();
      setUsers(data);

      console.log('users: ', data);
    }

    fetchUsers();
  });

  return (
    <div
      {...props}
      className="flex size-full flex-col items-center justify-start gap-4"
    >
      <Title>Usuários Online</Title>

      <div className="flex flex-col gap-2 w-full h-fit">
        {users.map((userMap) => {
          if (userMap.id !== user?.id) {
            return (
              <User
                key={userMap.id}
                name={`Usuário ${userMap.name}`}
                onClick={() => handleUserClick(userMap.id)}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
