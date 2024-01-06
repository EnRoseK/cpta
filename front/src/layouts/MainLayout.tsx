import { Footer, Header, ScrollButton } from '@/components/layouts';
import React, { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

      <ScrollButton />
    </>
  );
};
