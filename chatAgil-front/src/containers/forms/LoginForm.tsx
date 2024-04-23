import { ComponentProps, useState } from 'react';
import { Input } from '../../components/Input';
import { Lock, Mail } from 'lucide-react';
import { Button } from '../../components/Button';
import { useAuth } from '../../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps extends ComponentProps<'form'> {}

export function LoginForm({ ...props }: LoginFormProps) {
  const { signin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit() {
    const result = await signin(email, password);

    console.log(result);

    if (result) {
      console.log('Login efetuado com sucesso');
      navigate('/quase-la');
    } else {
      console.log('Erro ao efetuar login');
    }
  }

  function handleRegister() {
    navigate('/registro');
  }

  return (
    <form
      {...props}
      className="size-full flex flex-col justify-between align-center"
    >
      <h1 className="text-3xl font-bold italic text-primary-500 text-center">
        Login
      </h1>
      <div className="flex w-full gap-4 flex-col">
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
      </div>
      <div className="flex w-full gap-2 flex-col">
        <Button variant="secondary" onClick={handleSubmit}>
          Entrar
        </Button>
        <Button type="button" variant="primary" onClick={handleRegister}>
          Registrar-se
        </Button>
      </div>
    </form>
  );
}
