import { VariantProps, cva } from 'class-variance-authority'
import { ArrowRight, Users } from 'lucide-react'
import { ComponentProps } from 'react'
import { cn } from '../lib/utils'

const roomVariants = cva(
  'flex h-12 w-full items-center  gap-2 px-3 rounded-lg border-b-2  cursor-pointer font-medium flex-shrink-0',
  {
    variants: {
      variant: {
        normal:
          'bg-slate-100 text-slate-600 border-slate-400 hover:border-primary-500',
        chat: 'bg-white text-secondary-500 border-secondary-500',
      },
    },
  },
)

interface RoomProps
  extends ComponentProps<'div'>,
  VariantProps<typeof roomVariants> {
  name: string
}

export function Room({ variant, className, name, ...props }: RoomProps) {
  return (
    <div className={cn(roomVariants({ variant, className }))} {...props}>
      <Users size={24} />
      <span className="flex-1 text-left">{name}</span>
      {variant !== 'chat' && <ArrowRight size={24} />}
    </div>
  )
}
