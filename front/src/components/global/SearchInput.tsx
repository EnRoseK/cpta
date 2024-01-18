import { Icons } from '@/libs';
import React, { ComponentProps, FC } from 'react';

interface SearchInputProps extends ComponentProps<'input'> {
  onSubmit: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({ onSubmit, ...rest }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className='relative min-w-[270px] rounded-[5px] border border-gray  focus-within:border-primary'>
        <input
          type='text'
          {...rest}
          className='w-full rounded-[5px] px-5 py-4 text-[13px] leading-[10px] text-dark placeholder:text-description'
        />
        <button
          type='submit'
          className='absolute bottom-0 right-0 top-0 rounded-e-[5px] bg-primary px-4 text-white active:ring active:ring-primary/50'
        >
          <Icons.CiSearch size={16} />
        </button>
      </div>
    </form>
  );
};
