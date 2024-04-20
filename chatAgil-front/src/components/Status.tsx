import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

const statusVariants = cva('size-4 rounded-full flex-shrink-0', {
  variants: {
    variant: {
      ONLINE: 'bg-primary-500',
      OFFLINE: 'bg-slate-400',
    },
    defaultVariants: {
      variant: 'ONLINE',
    },
  },
});

export interface StatusProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {}

export function Status({
  variant = 'ONLINE',
  className,
  ...props
}: StatusProps) {
  return (
    <div {...props} className={cn(statusVariants({ variant, className }))} />
  );
}

export type StatusVariant = Pick<StatusProps, 'variant'>;
