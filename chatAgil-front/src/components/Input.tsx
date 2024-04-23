import { Eye, EyeOff, LucideIcon } from 'lucide-react';
import { ComponentProps, useState } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  Icon?: LucideIcon;
  RightIcon?: LucideIcon;
}

export function Input({
  name,
  label,
  Icon,
  RightIcon,
  disabled,
  onClick,
  type = 'text',
  ...props
}: InputProps) {
  const [inputType, setInputType] = useState(type);
  return (
    <div
      aria-disabled={disabled}
      className="h-16 w-full border-b-2 border-slate-400 bg-slate-100 focus-within:border-primary-500 flex 
     gap-2 px-3 py-2 items-center rounded-lg text-slate-500 focus-within:text-primary-500 aria-[disabled=true]:color-slate-400 aria-[disabled=true]:bg-slate-200 hide-eye"
      onClick={onClick}
    >
      <div className="w-full flex flex-col gap-1">
        <label
          htmlFor={name}
          className="flex items-center justify-start gap-2 text-sm font-medium"
        >
          {Icon && <Icon size={16} strokeWidth={3} />}
          {label}
        </label>
        <input
          {...props}
          type={inputType}
          disabled={disabled}
          className="flex-1 bg-transparent border-none text-slate-800 placeholder:text-slated-500 outline-none w-full text-lg"
        />
      </div>
      {type === 'password' &&
        (inputType === 'password' ? (
          <Eye size={32} onClick={() => setInputType('text')} />
        ) : (
          <EyeOff size={32} onClick={() => setInputType('password')} />
        ))}

      {type !== 'password' && RightIcon && (
        <RightIcon
          size={24}
          strokeWidth={3}
          className="text-slate-500 cursor-pointer"
        />
      )}
    </div>
  );
}
