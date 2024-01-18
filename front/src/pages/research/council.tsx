import { getResearchCouncilPage, getResearchCouncils } from '@/api/services';
import { PageHeader, ResearchCouncilCard } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IResearchCouncil, IResearchCouncilPage } from '@/interfaces';
import { parseMarkDown } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface ResearchCouncilPageProps {
  researchCouncilPage: IResearchCouncilPage;
  researchCouncils: IResearchCouncil[];
}

export const getStaticProps: GetStaticProps<ResearchCouncilPageProps> = async ({ locale }) => {
  const [researchCouncilPageRes, councilsRes] = await Promise.all([
    getResearchCouncilPage({ locale: locale as string }),
    getResearchCouncils({ locale: locale as string }),
  ]);

  return {
    props: {
      researchCouncilPage: researchCouncilPageRes.data,
      researchCouncils: councilsRes.data,
    },
  };
};

const ResearchCouncilPage: NextPage<ResearchCouncilPageProps> = ({ researchCouncilPage, researchCouncils }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${researchCouncilPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={researchCouncilPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/research/council'}
        openGraph={{
          title: `${researchCouncilPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: researchCouncilPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/research/council',
        }}
      />

      <PageHeader
        title={researchCouncilPage.pageTitle}
        pages={[{ title: researchCouncilPage.pageTitle, link: '/research/council' }]}
      />

      <section className='container py-20 lg:py-[120px]'>
        {researchCouncilPage.title && (
          <h3 className='mb-20 text-center text-xl text-dark'>{researchCouncilPage.title}</h3>
        )}

        <div className='grid grid-cols-1 gap-x-6 gap-y-[30px] min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {researchCouncils.map((council) => {
            return <ResearchCouncilCard key={council.id} researchCouncil={council} />;
          })}
        </div>

        {researchCouncilPage.content && (
          <div
            className='blog-details mt-20'
            dangerouslySetInnerHTML={{ __html: parseMarkDown(researchCouncilPage.content) }}
          ></div>
        )}
      </section>
    </>
  );
};

export default ResearchCouncilPage;
