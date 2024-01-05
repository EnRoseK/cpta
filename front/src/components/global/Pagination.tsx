import { Icons } from '@/libs';
import React, { FC, ReactNode } from 'react';

export const Pagination: FC = () => {
  return (
    <div className='flex w-full items-center justify-center gap-2.5'>
      <PaginationButton>
        <Icons.IoIosArrowRoundBack size={24} />
      </PaginationButton>
      <PaginationButton>01</PaginationButton>
      <PaginationButton>02</PaginationButton>
      <PaginationButton>03</PaginationButton>
      <PaginationButton>04</PaginationButton>
      <PaginationButton>
        <Icons.IoIosArrowRoundForward size={24} />
      </PaginationButton>
    </div>
  );
};

interface PaginationButtonProps {
  children: ReactNode;
}

const PaginationButton: FC<PaginationButtonProps> = ({ children }) => {
  return (
    <button
      type='button'
      className='flex max-h-[50px] items-center justify-center rounded-[3px] border border-dark/[0.07] px-6 py-4 text-small uppercase text-description hover:bg-primary hover:text-white'
    >
      {children}
    </button>
  );
};
