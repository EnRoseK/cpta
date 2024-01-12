import { getOfficePage, getOfficeWorkers } from '@/api/services';
import { PageHeader, StuffCard } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IOfficePage, IStuff } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface OfficePageProps {
  officePage: IOfficePage;
  officeWorkers: IStuff[];
}

export const getStaticProps: GetStaticProps<OfficePageProps> = async ({ locale }) => {
  const [officePageRes, officeWorkersRes] = await Promise.all([
    getOfficePage({ locale: locale as string }),
    getOfficeWorkers({ locale: locale as string }),
  ]);

  return {
    props: {
      officePage: officePageRes.data,
      officeWorkers: officeWorkersRes.data,
    },
  };
};

const OfficePage: NextPage<OfficePageProps> = ({ officePage, officeWorkers }) => {
  const { currentLocale } = useLocale();
  const availableLevels = Array.from(new Set(officeWorkers.map((officeWorker) => officeWorker.level)));

  return (
    <>
      <NextSeo
        title={`${officePage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={officePage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/office'}
        openGraph={{
          title: `${officePage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: officePage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/office',
          images: officeWorkers.map((worker) => ({
            url: convertAttachmentUrl(worker.picture.url),
            width: worker.picture.width,
            height: worker.picture.height,
          })),
        }}
      />

      <PageHeader title={officePage.pageTitle} pages={[{ title: officePage.pageTitle, link: '/office' }]} />

      <section className='container py-[120px]'>
        <div className='space-y-10'>
          {availableLevels.map((level) => {
            const currentLevelWorkers = officeWorkers.filter((worker) => worker.level === level);

            return (
              <div key={level} className='flex items-center justify-center gap-10'>
                {currentLevelWorkers
                  .sort((a, b) => a.priority - b.priority)
                  .map((worker) => {
                    return <StuffCard stuff={worker} key={worker.id} />;
                  })}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default OfficePage;
