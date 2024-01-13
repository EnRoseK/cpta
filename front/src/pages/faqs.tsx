import { getFAQPage } from '@/api/services';
import { PageHeader } from '@/components/global';
import { GroupQuestions } from '@/components/sections';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IFAQPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface FAQPageProps {
  faqPage: IFAQPage;
}

export const getStaticProps: GetStaticProps<FAQPageProps> = async ({ locale }) => {
  const res = await getFAQPage({ locale: locale as string });

  return {
    props: {
      faqPage: res.data,
    },
  };
};

const FAQPage: NextPage<FAQPageProps> = ({ faqPage }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${faqPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={faqPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/faqs'}
        openGraph={{
          title: `${faqPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: faqPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/faqs',
        }}
      />

      <PageHeader title={faqPage.pageTitle} pages={[{ title: faqPage.pageTitle, link: '/faqs' }]} />

      <section className='container py-20 lg:py-[120px]'>
        <div className='grid grid-cols-1 gap-25 xl:grid-cols-2'>
          {faqPage.groupQuestions.map((groupQuestion) => {
            return <GroupQuestions key={groupQuestion.id} groupQuestion={groupQuestion} />;
          })}
        </div>
      </section>
    </>
  );
};

export default FAQPage;
