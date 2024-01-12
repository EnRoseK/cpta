import { getLogoPage } from '@/api/services';
import { LogoCard, PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { ILogoPage } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface LogoPageProps {
  logoPage: ILogoPage;
}

export const getStaticProps: GetStaticProps<LogoPageProps> = async ({ locale }) => {
  const res = await getLogoPage({ locale: locale as string });

  return {
    props: {
      logoPage: res.data,
    },
  };
};

const LogoPage: NextPage<LogoPageProps> = ({ logoPage }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${logoPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={logoPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/directors'}
        openGraph={{
          title: `${logoPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: logoPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/directors',
          images: logoPage.logos.map((logo) => ({
            url: convertAttachmentUrl(logo.url),
            width: logo.width,
            height: logo.height,
          })),
        }}
      />

      <PageHeader title={logoPage.pageTitle} pages={[{ title: logoPage.pageTitle, link: '/logo' }]} />

      <section className='container py-[120px]'>
        <div className='grid grid-cols-3 gap-6'>
          {logoPage.logos.map((logo) => {
            return <LogoCard logo={logo} key={logo.id} />;
          })}
        </div>
      </section>
    </>
  );
};

export default LogoPage;
