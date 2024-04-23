import { ComponentProps, useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ArrowRight, User, Users } from 'lucide-react';
import { User as UserType } from '../../types/User';
import { useNavigate } from 'react-router-dom';
import { socketIo } from '../../socket/socket';
import { useAuth } from '../../Auth/AuthProvider';
import { Title } from '../../components/Title';

interface AlmostThereFormProps extends ComponentProps<'form'> {}

export function AlmostThereForm({ ...props }: AlmostThereFormProps) {
  const [userStorage, setUserStorage] = useState<UserType>({} as UserType);
  const { singout } = useAuth();
  const navigate = useNavigate();

  function handleEnterRoom() {
    navigate('/salas');
  }

  function handleEnterUser() {
    navigate('/usuarios-online');
  }

  function handleLogout() {
    singout();
    navigate('/login');
  }

  function handleRegister() {
    singout();
    navigate('/registro');
  }

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await socketIo.connect();
        console.log('Connected to the server');

        const storedUser = localStorage.getItem('@chatAgil:user');

        if (storedUser) {
          const currentUser = JSON.parse(storedUser);
          setUserStorage(currentUser);

          socketIo.emit('userLoggedIn', {
            id: currentUser.id,
            status: 'online',
          });
        }
      } catch (err) {
        console.log('Error connecting to server', err);
      }
    };

    initializeConnection();
  }, []);

  return (
    <form
      {...props}
      className="size-full flex flex-col justify-between align-center"
    >
      <Title>Quase lá </Title>
      <div className="flex w-full gap-4 flex-col">
        <Input
          label="Usuário"
          Icon={User}
          name="username"
          type="text"
          value={userStorage.name}
          disabled
        />
        <Input
          label="Sala"
          Icon={Users}
          name="room"
          type="text"
          RightIcon={ArrowRight}
          disabled
          value="Selecionar uma sala"
          onClick={handleEnterRoom}
        />
        <Input
          label="Usuários online"
          Icon={Users}
          name="users"
          type="text"
          RightIcon={ArrowRight}
          disabled
          value="Selecionar um usuário"
          onClick={handleEnterUser}
        />
      </div>
      <div className="flex w-full gap-2 flex-col">
        <Button
          variant="secondary"
          onClick={() => {
            handleLogout();
          }}
        >
          Entrar
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => handleRegister()}
        >
          Registrar-se
        </Button>
      </div>
    </form>
  );
}
