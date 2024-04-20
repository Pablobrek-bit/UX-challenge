import { ComponentProps } from 'react';
import { Status, StatusVariant } from './Status';
import { UserLetter } from './UserLetter';

interface ChatUserProps extends ComponentProps<'div'> {
  name: string;
  label?: string;
  status: StatusVariant['variant'];
  isYou?: boolean;
}

export function ChatUser({
  name,
  label,
  status,
  isYou,
  ...props
}: ChatUserProps) {
  return (
    <div
      className={`flex flex-shrink-0 items-center bg-white rounded-lg border-b-2  px-3 py-2 h-14 w-full gap-2 ${isYou ? 'border-secondary-500' : status === 'ONLINE' ? 'border-primary-500' : 'border-slate-400'} `}
      {...props}
    >
      <UserLetter letter={name.trim()[0]} />
      <div className="flex flex-col w-full">
        <span className="text-base font-medium text-slate-600">{name}</span>
        {label && !isYou && (
          <span className="block text-sm text-slate-400">{label}</span>
        )}
        {isYou && <span className="block text-sm text-slate-400 ">Você</span>}
      </div>
      <Status variant={status} />
    </div>
  );
}
