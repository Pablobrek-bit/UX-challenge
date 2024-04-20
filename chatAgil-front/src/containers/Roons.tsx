import { ComponentProps, useEffect, useState } from 'react';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { Room } from '../components/Room';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRooms, getRoomsResponse } from '../api/room/getRooms';
import { isUserInRoom } from '../api/user/isUserInRoom';

interface RoonsProps extends ComponentProps<'div'> {}

export function Roons({ ...props }: RoonsProps) {
  const [rooms, setRooms] = useState<getRoomsResponse[]>([]);

  const navigate = useNavigate();

  function handleCreateRoom() {
    navigate('/criar-sala');
  }

  async function handleRooms() {
    const data = await getRooms();

    setRooms(data);
  }

  async function goToRoom(id: number) {
    const userInRoom = await isUserInRoom(id);

    if (!userInRoom) {
      alert('Você não está autorizado a entrar nesta sala');
      return;
    }

    navigate(`/mensagens/room/${id}`);
  }

  useEffect(() => {
    handleRooms();
  }, []);

  return (
    <div
      {...props}
      className="flex size-full flex-col items-center justify-between"
    >
      <Title>Salas</Title>
      <div className="flex flex-col gap-2 w-full h-fit">
        {rooms.map((room) => {
          return (
            <Room
              key={room.id}
              name={room.name}
              onClick={() => goToRoom(room.id)}
            />
          );
        })}
      </div>
      <Button variant="primary" Icon={Users} onClick={() => handleCreateRoom()}>
        Criar sala
      </Button>
    </div>
  );
}
