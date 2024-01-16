import { Icons } from '@/libs';
import React, { FC } from 'react';
import Link from 'next/link';
import { useLocale } from '@/hooks';
import { seeMore } from '@/constants';

interface SeeMoreLinkProps {
  asButton?: boolean;
  text?: string;
  href?: string;
  onClick?: () => void;
}

export const SeeMoreLink: FC<SeeMoreLinkProps> = ({
  asButton = false,
  text,
  href = '#',
  onClick = () => undefined,
}) => {
  const { currentLocale } = useLocale();

  const defaultText = text || seeMore[currentLocale! as 'mn' | 'en'];

  if (asButton) {
    return (
      <button
        type='button'
        onClick={onClick}
        className='flex items-center gap-2 text-base leading-normal text-description hover:underline'
      >
        <span>{defaultText}</span>
        <Icons.IoIosArrowRoundForward size={20} />
      </button>
    );
  }

  return (
    <Link href={href} className='flex items-center gap-2 text-base leading-normal text-description hover:underline'>
      <span>{defaultText}</span>
      <Icons.IoIosArrowRoundForward size={20} />
    </Link>
  );
};
