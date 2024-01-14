import { getSupervisors, getSupervisorsPage } from '@/api/services';
import { PageHeader, StuffCard } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IStuff, ISupervisorsPage } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

interface SupervisorsPageProps {
  supervisorsPage: ISupervisorsPage;
  supervisors: IStuff[];
}

export const getStaticProps: GetStaticProps<SupervisorsPageProps> = async ({ locale }) => {
  const [supervisorsPageRes, supervisorsRes] = await Promise.all([
    getSupervisorsPage({ locale: locale as string }),
    getSupervisors({ locale: locale as string }),
  ]);

  return {
    props: {
      supervisorsPage: supervisorsPageRes.data,
      supervisors: supervisorsRes.data,
    },
  };
};

const SupervisorsPage: NextPage<SupervisorsPageProps> = ({ supervisorsPage, supervisors }) => {
  const { currentLocale } = useLocale();
  const availableLevels = Array.from(new Set(supervisors.map((supervisor) => supervisor.level)));

  return (
    <>
      <NextSeo
        title={`${supervisorsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={supervisorsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/supervisors'}
        openGraph={{
          title: `${supervisorsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: supervisorsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/supervisors',
          images: supervisors.map((supervisor) => ({
            url: convertAttachmentUrl(supervisor.picture.url),
            width: supervisor.picture.width,
            height: supervisor.picture.height,
          })),
        }}
      />

      <PageHeader
        title={supervisorsPage.pageTitle}
        pages={[{ title: supervisorsPage.pageTitle, link: '/supervisors' }]}
      />

      <section className='container py-20 lg:py-[120px]'>
        {supervisorsPage.smallDescription && (
          <p className='mb-20 text-start text-base leading-[30px] text-description'>
            {supervisorsPage.smallDescription}
          </p>
        )}
        <div className='space-y-10'>
          {availableLevels.map((level) => {
            const currentLevelSupervisors = supervisors.filter((supervisor) => supervisor.level === level);

            return (
              <div key={level} className='flex flex-wrap items-center justify-center gap-10'>
                {currentLevelSupervisors
                  .sort((a, b) => a.priority - b.priority)
                  .map((supervisor) => {
                    return <StuffCard stuff={supervisor} key={supervisor.id} />;
                  })}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default SupervisorsPage;
