import { IPagination } from '@/interfaces';
import { Icons } from '@/libs';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pagination: IPagination;
}

export const Pagination: FC<PaginationProps> = ({ pagination }) => {
  const router = useRouter();

  return (
    <ReactPaginate
      className='flex w-full items-center justify-center gap-2.5'
      pageCount={pagination.pageCount}
      breakLabel={'...'}
      pageLinkClassName='flex max-h-[50px] items-center justify-center rounded-[3px] border border-dark/[0.07] px-6 py-4 text-small uppercase text-description hover:bg-primary hover:text-white disabled:pointer-events-none disabled:bg-description/10'
      activeLinkClassName='pointer-events-none bg-primary text-white'
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      previousLinkClassName='flex max-h-[50px] items-center justify-center rounded-[3px] border border-dark/[0.07] px-6 py-4 text-small uppercase text-description hover:bg-primary hover:text-white disabled:pointer-events-none disabled:bg-description/10'
      nextLinkClassName='flex max-h-[50px] items-center justify-center rounded-[3px] border border-dark/[0.07] px-6 py-4 text-small uppercase text-description hover:bg-primary hover:text-white disabled:pointer-events-none disabled:bg-description/10'
      previousLabel={<Icons.IoIosArrowRoundBack size={24} />}
      nextLabel={<Icons.IoIosArrowRoundForward size={24} />}
      forcePage={pagination.page - 1}
      onPageChange={(e) => {
        router.push({ query: { ...router.query, page: e.selected + 1 } }, undefined, { scroll: true });
      }}
      renderOnZeroPageCount={null}
    />
  );
};
