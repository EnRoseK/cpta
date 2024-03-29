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
          images: logoPage.logoImages.map((logo) => ({
            url: convertAttachmentUrl(logo.image.url),
            width: logo.image.width,
            height: logo.image.height,
          })),
        }}
      />

      <PageHeader title={logoPage.pageTitle} pages={[{ title: logoPage.pageTitle, link: '/logo' }]} />

      <section className='container py-20 lg:py-[120px]'>
        <div className='grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 md:grid-cols-3'>
          {logoPage.logoImages.map((logo) => {
            return <LogoCard logo={logo.image} key={logo.id} />;
          })}
        </div>
      </section>
    </>
  );
};

export default LogoPage;
