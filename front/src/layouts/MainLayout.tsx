import { Footer, Header, ScrollButton } from '@/components/layouts';
import { LoadingScreen } from '@/components/utils';
import { useAnimation, useGlobalContext, useLocale } from '@/hooks';
import { NextSeo } from 'next-seo';
import React, { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isLoading } = useGlobalContext();
  const { currentLocale } = useLocale();
  const [renderLoading, onAnimationEnd] = useAnimation(isLoading);

  return (
    <>
      <NextSeo
        openGraph={{
          siteName:
            currentLocale === 'mn'
              ? 'Монгол Улсын Татварын Мэргэшсэн Зөвлөхийн нийгэмлэг'
              : 'Mongolian Association of Certified Tax Consultants',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: currentLocale === 'mn' ? '' : '',
          },
        ]}
      />

      <Header />
      <main>{children}</main>
      <Footer />

      <ScrollButton />

      {/* {renderLoading && <LoadingScreen show={isLoading} onAnimationEnd={onAnimationEnd} />} */}
    </>
  );
};
