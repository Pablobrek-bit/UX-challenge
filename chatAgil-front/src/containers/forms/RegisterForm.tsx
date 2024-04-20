import { ComponentProps, useState } from 'react';
import { Input } from '../../components/Input';
import { Lock, Mail, User } from 'lucide-react';
import { Button } from '../../components/Button';
import { createUser } from '../../api/user/createUser';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps extends ComponentProps<'form'> {}

export function RegisterForm({ ...props }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  async function handleRegister() {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    const user = await createUser(name, email, password);

    console.log('user: ', user);

    if (user) {
      alert('Usuário criado com sucesso!');
      navigate('/login');
    } else {
      alert('Erro ao criar usuário');
    }
  }

  return (
    <form
      {...props}
      className="size-full flex flex-col justify-between align-center"
    >
      <h1 className="text-3xl font-bold italic text-primary-500 text-center">
        Registro
      </h1>
      <div className="flex w-full gap-4 flex-col">
        <Input
          label="Nome"
          Icon={User}
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="E-mail"
          Icon={Mail}
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Senha"
          Icon={Lock}
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirme sua senha"
          Icon={Lock}
          name="password-confirmation"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex w-full gap-2 flex-col">
        <Button variant="secondary" onClick={() => handleRegister()}>
          Registrar-se
        </Button>
      </div>
    </form>
  );
}
