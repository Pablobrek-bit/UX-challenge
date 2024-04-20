import { ComponentProps } from 'react'

interface BackgroundProps extends ComponentProps<'div'> {
  // Defina suas props aqui
}

export function Background({ ...props }: BackgroundProps) {
  return (
    <div {...props} className="size-full absolute z-[-1] bg-primary-100">
      <div className="size-72 top-[15%] left-[15%] rounded-full bg-secondary-500 absolute blur-[100px] opacity-50" />
      <div className="size-80 bottom-[5%] left-[25%] rounded-full bg-primary-600 absolute blur-[100px] opacity-50" />
      <div className="size-[32rem] top-[15%] right-[10%] rounded-full bg-primary-500 absolute blur-[100px] opacity-50" />
    </div>
  )
}
