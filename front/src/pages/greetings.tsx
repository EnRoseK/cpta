import { getGreetings, getGreetingsPage } from '@/api/services';
import { GreetingCard, PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IGreeting, IGreetingsPage } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface GreetinsPageProps {
  greetingsPage: IGreetingsPage;
  greetings: IGreeting[];
}

export const getStaticProps: GetStaticProps<GreetinsPageProps> = async ({ locale }) => {
  const [greetingsPageRes, greetingsRes] = await Promise.all([
    getGreetingsPage({ locale: locale as string }),
    getGreetings({ locale: locale as string }),
  ]);

  return {
    props: {
      greetingsPage: greetingsPageRes.data,
      greetings: greetingsRes.data,
    },
  };
};

const GreetinsPage: NextPage<GreetinsPageProps> = ({ greetingsPage, greetings }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${greetingsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={greetingsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/greetings'}
        openGraph={{
          title: `${greetingsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: greetingsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/greetings',
          images: greetings.map((greeting) => ({
            url: convertAttachmentUrl(greeting.picture.url),
            width: greeting.picture.width,
            height: greeting.picture.height,
          })),
        }}
      />

      <PageHeader title={greetingsPage.pageTitle} pages={[{ title: greetingsPage.pageTitle, link: '/greetings' }]} />

      <section className='container py-20 lg:py-[120px]'>
        <div className='grid grid-cols-1 gap-6 min-[500px]:grid-cols-2 min-[900px]:grid-cols-3'>
          {[...greetings, ...greetings, ...greetings].map((greeting) => {
            return <GreetingCard key={greeting.id} greeting={greeting} />;
          })}
        </div>
      </section>
    </>
  );
};

export default GreetinsPage;
