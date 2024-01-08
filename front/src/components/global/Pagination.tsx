import { IPagination } from '@/interfaces';
import { Icons } from '@/libs';
import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

interface PaginationProps {
  pagination: IPagination;
}

export const Pagination: FC<PaginationProps> = ({ pagination }) => {
  return (
    <div className='flex w-full items-center justify-center gap-2.5'>
      <PaginationButton disabled={pagination.page === 1}>
        <Icons.IoIosArrowRoundBack size={24} />
      </PaginationButton>
      <PaginationButton active>{pagination.page}</PaginationButton>
      <PaginationButton disabled={pagination.page === pagination.pageCount}>
        <Icons.IoIosArrowRoundForward size={24} />
      </PaginationButton>
    </div>
  );
};

interface PaginationButtonProps {
  children: ReactNode;
  disabled?: boolean;
  active?: boolean;
}

const PaginationButton: FC<PaginationButtonProps> = ({ children, disabled = false, active = false }) => {
  return (
    <button
      type='button'
      className={classNames(
        'flex max-h-[50px] items-center justify-center rounded-[3px] border border-dark/[0.07] px-6 py-4 text-small uppercase text-description hover:bg-primary hover:text-white disabled:pointer-events-none disabled:bg-description/10',
        { 'pointer-events-none bg-primary text-white': active },
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
