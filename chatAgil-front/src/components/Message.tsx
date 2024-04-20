import { ComponentProps } from 'react';
import { UserLetter } from './UserLetter';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const messageVariants = cva(
  'border-b-2 rounded-lg p-2 min-w-[8rem] max-w-[22rem] flex flex-col items-center gap-2 h-fit',
  {
    variants: {
      variant: {
        received: 'border-slate-400 bg-slate-100 text-slate-500 mr-auto',
        sent: 'border-primary-500 bg-primary-100 text-primary-700 ml-auto',
      },
    },
  },
);

interface MessageProps
  extends ComponentProps<'div'>,
    VariantProps<typeof messageVariants> {
  name: string;
  message: string;
  time: string;
}

export function Message({
  variant = 'sent',
  className,
  name,
  message,
  time,
  ...props
}: MessageProps) {
  return (
    <div className={cn(messageVariants({ variant, className }))} {...props}>
      <div className="flex w-full justify-between items-center ">
        <strong className="font-medium text-[0.625rem] text-secondary-500 flex items-center justify-center gap-1">
          <UserLetter letter={name.trim()[0]} variant="small" />
          {variant === 'sent' ? 'Você' : name}
        </strong>
        <span className="text-xxs">{time}</span>
      </div>
      <p className="text-slate-800 text-[0.875rem] text-left w-full">
        {message}
      </p>
    </div>
  );
}
