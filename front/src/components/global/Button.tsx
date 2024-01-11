import { VariantProps, cva } from 'class-variance-authority';
import React, { ComponentProps, FC, ReactNode } from 'react';
import Link from 'next/link';

const button = cva('flex items-center gap-2.5', {
  variants: {
    variant: {
      primary:
        'bg-primary text-white border border-transparent hover:border-primary hover:bg-transparent hover:text-primary active:ring active:ring-primary/50',
      secondary:
        'bg-secondary text-dark border border-transparent hover:border-secondary hover:bg-transparent active:ring active:ring-secondary/50',
      gray: 'bg-gray text-dark hover:bg-primary hover:text-white active:ring active:ring-primary/50',
    },
    size: {
      DEFAULT: 'py-[14px] px-[30px] rounded-[5px] text-base font-medium',
      small: 'py-2.5 px-5 rounded-[5px] font-medium text-sm',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-max',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'DEFAULT',
    fullWidth: false,
  },
});

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof button> {
  children: ReactNode;
  asLink?: boolean;
  href?: string;
  newTab?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant,
  size,
  fullWidth,
  asLink = false,
  newTab = false,
  href,
  ...rest
}) => {
  if (asLink) {
    return (
      <Link href={href || '#'} target={newTab ? '_blank' : '_self'} className={button({ variant, size, fullWidth })}>
        {children}
      </Link>
    );
  }

  return (
    <button className={button({ variant, size, fullWidth })} {...rest}>
      {children}
    </button>
  );
};
