import { getDirectors, getDirectorsPage } from '@/api/services';
import { StuffCard, PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IStuff, IDirectorsPage } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

interface DirectorsPageProps {
  directorsPage: IDirectorsPage;
  directors: IStuff[];
}

export const getStaticProps: GetStaticProps<DirectorsPageProps> = async ({ locale }) => {
  const [directorsPageRes, directorsRes] = await Promise.all([
    getDirectorsPage({ locale: locale as string }),
    getDirectors({ locale: locale as string }),
  ]);

  return {
    props: {
      directorsPage: directorsPageRes.data,
      directors: directorsRes.data,
    },
  };
};

const DirectorsPage: NextPage<DirectorsPageProps> = ({ directorsPage, directors }) => {
  const { currentLocale } = useLocale();
  const availableLevels = Array.from(new Set(directors.map((director) => director.level)));

  return (
    <>
      <NextSeo
        title={`${directorsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={directorsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/directors'}
        openGraph={{
          title: `${directorsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: directorsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/directors',
          images: directors.map((director) => ({
            url: convertAttachmentUrl(director.picture.url),
            width: director.picture.width,
            height: director.picture.height,
          })),
        }}
      />

      <PageHeader title={directorsPage.pageTitle} pages={[{ title: directorsPage.pageTitle, link: '/directors' }]} />

      <section className='container py-20 lg:py-[120px]'>
        {directorsPage.smallDescription && (
          <p className='mb-20 text-start text-base leading-[30px] text-description'>{directorsPage.smallDescription}</p>
        )}
        <div className='space-y-10'>
          {availableLevels.map((level) => {
            const currentLevelDirectors = directors.filter((dir) => dir.level === level);

            return (
              <div key={level} className='flex flex-wrap items-center justify-center gap-10'>
                {currentLevelDirectors
                  .sort((a, b) => a.priority - b.priority)
                  .map((director) => {
                    return <StuffCard stuff={director} key={director.id} />;
                  })}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default DirectorsPage;
