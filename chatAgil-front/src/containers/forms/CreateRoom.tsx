import { ComponentProps, useState } from 'react';
import { Input } from '../../components/Input';
import { Lock, Users } from 'lucide-react';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { createRoom } from '../../api/room/createRoom';
import { useNavigate } from 'react-router-dom';

interface CreateRoomFormProps extends ComponentProps<'form'> {}

export function CreateRoomForm({ ...props }: CreateRoomFormProps) {
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  async function handleCreateRoom() {
    if (visibility === 'public') {
      const data = await createRoom(name);

      alert('Sala criada com sucesso');

      return navigate('/salas');
    }

    if (password !== confirmPassword) return alert('As senhas não são iguais');

    const data = await createRoom(name, password);

    alert('Sala criada com sucesso');

    return navigate('/salas');
  }

  return (
    <form
      {...props}
      className="size-full flex flex-col justify-between align-center"
    >
      <Title>Criar Sala</Title>
      <div className="flex w-full gap-4 flex-col">
        <div className="flex w-full gap-4">
          <Button
            variant={visibility === 'public' ? 'primary' : 'ghost'}
            onClick={() => setVisibility('public')}
          >
            Pública
          </Button>
          <Button
            variant={visibility === 'private' ? 'primary' : 'ghost'}
            onClick={() => setVisibility('private')}
          >
            Privada
          </Button>
        </div>
        <Input
          label="Nome"
          Icon={Users}
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        {visibility === 'private' && (
          <>
            <Input
              label="Senha"
              Icon={Lock}
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirme a senha"
              Icon={Lock}
              name="password-confirmation"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
      </div>
      <div className="flex w-full gap-2 flex-col">
        <Button variant="secondary" onClick={() => handleCreateRoom()}>
          Criar Sala
        </Button>
      </div>
    </form>
  );
}
