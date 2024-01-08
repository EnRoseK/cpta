import { Icons } from '@/libs';
import React, { FC, useState } from 'react';
import { MegaMenu } from './MegaMenu';
import { DropdownMenu } from './DropdownMenu';
import { useAnimation } from '@/hooks';
import { CustomLink } from '@/components/global';

interface NavItemProps {
  megaMenu?: boolean;
}

export const NavItem: FC<NavItemProps> = ({ megaMenu = false }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [renderDropdown, onAnimationEnd] = useAnimation(showDropdown);

  return (
    <li
      className={megaMenu ? '' : 'relative'}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <CustomLink
        href='#'
        className='group flex items-center gap-2 py-5 text-small font-medium uppercase hover:text-secondary'
      >
        <span>Мэдээ, мэдээлэл</span>
        <Icons.IoChevronDownSharp size={18} className='group-hover:rotate-180' />
      </CustomLink>

      {renderDropdown && (
        <>
          {megaMenu ? (
            <MegaMenu show={showDropdown} onAnimationEnd={onAnimationEnd} />
          ) : (
            <DropdownMenu onAnimationEnd={onAnimationEnd} show={showDropdown} />
          )}
        </>
      )}
    </li>
  );
};
