import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginForm } from '../containers/forms/LoginForm';
import { AlmostThereForm } from '../containers/forms/AlmostThereForm';
import { RegisterForm } from '../containers/forms/RegisterForm';
import { Roons } from '../containers/Roons';
import { OnlineUsers } from '../containers/OnlineUsers';
import { CreateRoomForm } from '../containers/forms/CreateRoom';
import { MessagesRoom } from '../pages/MessagesRoom';
import { Authenticated } from '../components/Authenticaded';
import { MessagesConversation } from '../pages/MessagesConversation';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/',
        element: (
          <Authenticated>
            <Navigate to="/quase-la" replace />
          </Authenticated>
        ),
      },
      {
        path: '/quase-la',
        element: (
          <Authenticated>
            <AlmostThereForm />
          </Authenticated>
        ),
      },
      {
        path: '/registro',
        element: <RegisterForm />,
      },
      {
        path: '/salas',
        element: (
          <Authenticated>
            <Roons />
          </Authenticated>
        ),
      },
      {
        path: '/usuarios-online',
        element: (
          <Authenticated>
            <OnlineUsers />
          </Authenticated>
        ),
      },
      {
        path: '/criar-sala',
        element: (
          <Authenticated>
            <CreateRoomForm />
          </Authenticated>
        ),
      },
    ],
  },
  {
    path: '/mensagens/room/:id',
    element: <MessagesRoom />,
  },
  {
    path: '/mensagens/conversation/:id',
    element: <MessagesConversation />,
  },
]);
