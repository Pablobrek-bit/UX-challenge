import { ComponentProps } from 'react'

interface TitleProps extends ComponentProps<'h1'> {
  // Defina suas props aqui
}

export function Title({ children, ...props }: TitleProps) {
  return (
    <h1
      className="text-3xl font-bold italic text-primary-500 text-center"
      {...props}
    >
      {children}
    </h1>
  )
}
