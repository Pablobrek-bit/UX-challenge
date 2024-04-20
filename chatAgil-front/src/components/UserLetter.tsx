import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { cn } from '../lib/utils'

const userLetterVariants = cva(
  'flex items-center justify-center rounded-full flex-shrink-0 bg-secondary-500 text-white font-bold uppercase leading-[0px]',
  {
    variants: {
      variant: {
        normal: 'size-8 text-xl text-white',
        small: 'size-4 text-xxs text-white',
      },
    },
    defaultVariants: {
      variant: 'normal',
    },
  },
)

interface UserLetterProps
  extends ComponentProps<'span'>,
  VariantProps<typeof userLetterVariants> {
  letter: string
}

export function UserLetter({
  variant = 'normal',
  className,
  letter,
  ...props
}: UserLetterProps) {
  return (
    <span className={cn(userLetterVariants({ variant, className }))} {...props}>
      {letter}
    </span>
  )
}
