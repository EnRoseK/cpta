import { JobCard, PageHeader, Pagination } from '@/components/global';
import { NextPage } from 'next';

const JobsPage: NextPage = () => {
  return (
    <>
      <PageHeader title='Ажлын байр' pages={[{ title: 'Ажлын байр', link: '/jobs' }]} />

      <section className='container py-[120px]'>
        <div className='mb-10 grid grid-cols-3 gap-x-6 gap-y-[30px]'>
          {Array.from(Array(9)).map((_, index) => {
            return <JobCard key={index} />;
          })}
        </div>
        {/* <Pagination /> */}
      </section>
    </>
  );
};

export default JobsPage;
