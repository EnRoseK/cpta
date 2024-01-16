import { getRulesAndRegulationPage } from '@/api/services';
import { PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IRulesAndRegulationsPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

interface RulesAndRegulationsPageProps {
  rulesAndRegulationsPage: IRulesAndRegulationsPage;
}

export const getStaticProps: GetStaticProps<RulesAndRegulationsPageProps> = async ({ locale }) => {
  const res = await getRulesAndRegulationPage({ locale: locale as string });

  return {
    props: {
      rulesAndRegulationsPage: res.data,
    },
  };
};

const RulesAndRegulationsPage: NextPage<RulesAndRegulationsPageProps> = ({ rulesAndRegulationsPage }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${rulesAndRegulationsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={rulesAndRegulationsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/rules-and-regulations'}
        openGraph={{
          title: `${rulesAndRegulationsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: rulesAndRegulationsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/rules-and-regulations',
        }}
      />

      <PageHeader
        title={rulesAndRegulationsPage.pageTitle}
        pages={[{ title: rulesAndRegulationsPage.pageTitle, link: '/rules-and-regulations' }]}
      />

      <section className='container py-20 lg:py-[120px]'>
        <div className='grid grid-cols-1 gap-20 md:grid-cols-2'>
          <div className='col-span-1 space-y-15'>
            <h2 className='border-b border-b-dark/20 pb-2 text-3xl font-semibold text-dark'>
              {currentLocale === 'mn' ? 'Журам' : 'Regulations'}
            </h2>

            <div className='space-y-10'>
              {rulesAndRegulationsPage.regulations.map((regulation) => {
                return (
                  <div key={regulation.id}>
                    {regulation.link ? (
                      <Link
                        className='mb-3 block text-lg font-medium text-primary hover:underline'
                        href={regulation.link}
                        target={regulation.newTab ? '_blank' : '_self'}
                      >
                        {regulation.title}
                      </Link>
                    ) : (
                      <h5 className=' mb-3 text-lg font-medium text-primary'>{regulation.title}</h5>
                    )}
                    <p className='text-base text-description'>{regulation.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='col-span-1 space-y-15'>
            <h2 className='border-b border-b-dark/20 pb-2 text-3xl font-semibold text-dark'>
              {currentLocale === 'mn' ? 'Дүрэм' : 'Rules'}
            </h2>

            <div className='space-y-10'>
              {rulesAndRegulationsPage.rules.map((rules) => {
                return (
                  <div key={rules.id}>
                    {rules.link ? (
                      <Link
                        className='mb-3 block text-lg font-medium text-primary hover:underline'
                        href={rules.link}
                        target={rules.newTab ? '_blank' : '_self'}
                      >
                        {rules.title}
                      </Link>
                    ) : (
                      <h5 className=' mb-3 text-lg font-medium text-primary'>{rules.title}</h5>
                    )}
                    <p className='text-base text-description'>{rules.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RulesAndRegulationsPage;
