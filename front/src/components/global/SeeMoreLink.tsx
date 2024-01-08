import { Icons } from '@/libs';
import React, { FC } from 'react';
import Link from 'next/link';

interface SeeMoreLinkProps {
  asButton?: boolean;
  text?: string;
  href?: string;
  onClick?: () => void;
}

export const SeeMoreLink: FC<SeeMoreLinkProps> = ({
  asButton = false,
  text = 'Бүгдийг харах',
  href = '#',
  onClick = () => undefined,
}) => {
  if (asButton) {
    return (
      <button
        type='button'
        onClick={onClick}
        className='flex items-center gap-2 text-base leading-normal text-description hover:underline'
      >
        <span>{text}</span>
        <Icons.IoIosArrowRoundForward size={20} />
      </button>
    );
  }

  return (
    <Link href={href} className='flex items-center gap-2 text-base leading-normal text-description hover:underline'>
      <span>{text}</span>
      <Icons.IoIosArrowRoundForward size={20} />
    </Link>
  );
};
