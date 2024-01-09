import { useAnimation } from '@/hooks';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Icons } from '@/libs';
import classNames from 'classnames';
import React, { FC } from 'react';

interface DropdownProps {
  placeholder?: string;
  items?: { label: string; value: string }[];
  selectedValue: string;
  onChangeHandler: (value: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({ placeholder = 'Сонгох', items = [], selectedValue, onChangeHandler }) => {
  const [showDropdown, setShowDropdown, ref] = useClickOutside();
  const [renderDropdown, onAnimationEnd] = useAnimation(showDropdown);

  return (
    <div ref={ref} className='relative'>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        type='button'
        className={classNames('flex items-center gap-10 rounded-[5px] bg-gray py-4 pl-[30px] pr-6 text-description', {
          'ring ring-primary/50': showDropdown,
        })}
      >
        <span className='text-sm leading-normal'>
          {!selectedValue ? placeholder : items.find((i) => i.value === selectedValue)?.label}
        </span>

        <span className={classNames({ 'rotate-180': showDropdown })}>
          <Icons.IoChevronDownSharp size={16} />
        </span>
      </button>

      {renderDropdown && (
        <div
          onAnimationEnd={onAnimationEnd}
          className={classNames(
            'absolute left-0 top-full z-50 mt-2 w-max min-w-full rounded-[5px] bg-gray p-5 text-sm leading-normal text-description',
            {
              'animate-fadeIn': showDropdown,
              'animate-fadeOut': !showDropdown,
            },
          )}
        >
          <div className='flex flex-col gap-5'>
            {items.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    onChangeHandler(item.value);
                    setShowDropdown(false);
                  }}
                  type='button'
                  className='w-full text-start hover:text-primary'
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
