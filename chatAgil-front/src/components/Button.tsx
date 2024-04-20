import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { LucideIcon } from 'lucide-react'

const buttonVariants = cva(
  'w-full h-16 border-b-2 border-black/30 rounded-lg text-xl font-bold hover:brightness-105 flex items-center justify-center gap-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-secondary-500 text-white',
        ghost: 'bg-slate-200 text-slate-600',
        input: '',
      },
      defaultVariants: {
        variant: 'primary',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  Icon?: LucideIcon
}

export function Button({
  className,
  variant,
  Icon,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      type={type}
      {...props}
    >
      {Icon && <Icon size={24} strokeWidth={3} />}
      {children}
    </button>
  )
}
