import { ArrowRight, Users } from 'lucide-react'
import { ComponentProps } from 'react'
import { Status } from './Status'

interface UserProps extends ComponentProps<'div'> {
  name: string
}

export function User({ name, ...props }: UserProps) {
  return (
    <div
      className="flex h-12 w-full items-center bg-slate-100 text-slate-600 gap-2 px-3 rounded-lg border-b-2 border-slate-400 cursor-pointer hover:border-primary-500"
      {...props}
    >
      <Users size={24} />
      <span className="flex-1 text-left">{name}</span>
      <Status variant="online" />
      <ArrowRight size={24} />
    </div>
  )
}
