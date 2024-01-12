import { getAboutUsPage, getStatistics } from '@/api/services';
import { PageHeader } from '@/components/global';
import { Statistics } from '@/components/sections';
import { useLocale } from '@/hooks';
import { IAboutUsPage, IStatistic } from '@/interfaces';
import { convertAttachmentUrl, parseMarkDown } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

interface AboutUsPageProps {
  statistics: IStatistic[];
  pageInfo: IAboutUsPage;
}

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async ({ locale }) => {
  const [statisticsRes, pageInfoRes] = await Promise.all([
    getStatistics({ locale: locale as string }),
    getAboutUsPage({ locale: locale as string }),
  ]);

  return {
    props: {
      statistics: statisticsRes.data,
      pageInfo: pageInfoRes.data,
    },
  };
};

const AboutUsPage: NextPage<AboutUsPageProps> = ({ statistics, pageInfo }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${pageInfo.pageTitle} | ${
          currentLocale === 'mn'
            ? 'Монгол Улсын Татварын Мэргэшсэн Зөвлөхийн нийгэмлэг'
            : 'Mongolian Association of Certified Tax Consultants'
        }`}
        description={pageInfo.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/about-us'}
        openGraph={{
          title: `${pageInfo.pageTitle} | ${
            currentLocale === 'mn'
              ? 'Монгол Улсын Татварын Мэргэшсэн Зөвлөхийн нийгэмлэг'
              : 'Mongolian Association of Certified Tax Consultants'
          }`,
          description: pageInfo.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/about-us',
          images: [
            {
              url: convertAttachmentUrl(pageInfo.picture?.url || ''),
              width: pageInfo.picture?.width,
              height: pageInfo.picture?.height,
            },
          ],
        }}
      />

      <PageHeader title={pageInfo.pageTitle} pages={[{ title: pageInfo.pageTitle, link: '/about-us' }]} />

      <section className='container py-[120px]'>
        <div className='mb-25 text-center'>
          {pageInfo.smallTitle && (
            <h2 className='mb-3 text-3xl uppercase leading-none text-dark'>{pageInfo.smallTitle}</h2>
          )}
          {pageInfo.subSmallTitle && <p className='text-base text-description'>{pageInfo.subSmallTitle}</p>}
        </div>

        <Statistics statistics={statistics} />

        {pageInfo.picture && (
          <div className='mb-5 aspect-[2.6/1] w-full overflow-hidden rounded-xl bg-[#c4c4c4]'>
            <Image
              src={convertAttachmentUrl(pageInfo.picture.url)}
              alt={pageInfo.picture.alternativeText || pageInfo.pageTitle}
              width={pageInfo.picture.width}
              height={pageInfo.picture.height}
              className='h-full w-full object-cover'
            />
          </div>
        )}

        {pageInfo.description && (
          <p className='mb-4 text-base leading-normal text-description'>{pageInfo.description}</p>
        )}

        {pageInfo.visions && pageInfo.visions.length > 0 && (
          <div className='grid grid-cols-3 gap-10 pt-10'>
            {pageInfo.visions.map((vision, index) => {
              const content = parseMarkDown(vision.content);

              return (
                <div
                  key={index}
                  className='group rounded-xl border border-gray px-[30px] py-[50px] shadow-card hover:bg-primary'
                >
                  <h6 className='mb-5 text-xl font-semibold uppercase text-dark group-hover:text-white'>
                    {vision.title}:
                  </h6>
                  <div
                    className='about-us__vision-content text-base leading-[30px] text-description group-hover:text-white'
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default AboutUsPage;
