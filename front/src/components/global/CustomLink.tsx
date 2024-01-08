import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';

interface CustomLinkProps extends LinkProps {
  children?: ReactNode;
  className: string;
}

export const CustomLink: FC<CustomLinkProps> = ({ href, ...rest }) => {
  const router = useRouter();
  const pathname = typeof href === 'object' ? href.pathname : href;

  return <Link {...rest} href={{ pathname, query: { locale: router.query.locale } }} />;
};
