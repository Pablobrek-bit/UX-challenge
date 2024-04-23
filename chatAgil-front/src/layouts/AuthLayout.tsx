import { ComponentProps } from 'react';

import chatAgilLogo from '../assets/chat-agil-logo.svg';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps extends ComponentProps<'div'> {}

export function AuthLayout({ ...props }: AuthLayoutProps) {
  return (
    <div {...props} className="flex items-center justify-center h-screen">
      <div className="w-[60rem] h-[40rem] bg-white/70 rounded-2xl flex overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <img src={chatAgilLogo} alt="Logo Chat Agil" className="h-40 " />
        </div>
        <div className="flex-1 bg-white flex items-center justify-between py-12 px-14 max-w-[50%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
