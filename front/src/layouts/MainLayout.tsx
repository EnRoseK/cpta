import { Footer, Header, ScrollButton } from '@/components/layouts';
import { LoadingScreen } from '@/components/utils';
import { useAnimation, useGlobalContext } from '@/hooks';
import React, { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isLoading } = useGlobalContext();
  const [renderLoading, onAnimationEnd] = useAnimation(isLoading);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

      <ScrollButton />

      {/* {renderLoading && <LoadingScreen show={isLoading} onAnimationEnd={onAnimationEnd} />} */}
    </>
  );
};
