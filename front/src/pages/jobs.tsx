import { getJobs, getJobsPage } from '@/api/services';
import { JobCard, PageHeader, Pagination } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IJob, IJobsPage, IPagination } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface JobsPageProps {
  jobsPage: IJobsPage;
  jobs: IJob[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<JobsPageProps> = async ({ locale, query }) => {
  const { page = '1' } = query;

  const [jobsPageRes, jobsRes] = await Promise.all([
    getJobsPage({ locale: locale as string }),
    getJobs({ locale: locale as string, page: Number(page) }),
  ]);

  return {
    props: {
      jobsPage: jobsPageRes.data,
      jobs: jobsRes.data,
      pagination: jobsRes.meta.pagination,
    },
  };
};

const JobsPage: NextPage<JobsPageProps> = ({ jobsPage, jobs, pagination }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${jobsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={jobsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/jobs'}
        openGraph={{
          title: `${jobsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: jobsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/jobs',
        }}
      />

      <PageHeader title={jobsPage.pageTitle} pages={[{ title: jobsPage.pageTitle, link: '/jobs' }]} />

      <section className='container py-20 lg:py-[120px]'>
        <div className='mb-10 grid grid-cols-1 gap-x-6 gap-y-[30px] md:grid-cols-2 lg:grid-cols-3'>
          {[...jobs, ...jobs, ...jobs].map((job) => {
            return <JobCard job={job} key={job.id} />;
          })}
        </div>
        <Pagination pagination={pagination} />
      </section>
    </>
  );
};

export default JobsPage;
