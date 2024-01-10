import classNames from 'classnames';
import React, { ComponentProps, FC } from 'react';

interface InputProps extends ComponentProps<'input'> {
  fullWidth?: boolean;
}

export const Input: FC<InputProps> = ({ fullWidth = true, ...rest }) => {
  return (
    <input
      {...rest}
      className={classNames(
        'rounded-[5px] bg-white px-5 py-2.5 text-sm text-dark shadow-card placeholder:text-description focus:outline-primary/50',
        {
          'w-full': fullWidth,
        },
      )}
    />
  );
};
