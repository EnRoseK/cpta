import { MemberCard, PageHeader } from '@/components/global';
import { NextPage } from 'next';

const HonoraryMembersPage: NextPage = () => {
  return (
    <>
      <PageHeader title='Хүндэт гишүүд' pages={[{ title: 'Хүндэт гишүүд', link: '/members/honorary' }]} />
      <section className='container py-[120px]'>
        <div className='grid grid-cols-4 gap-x-6 gap-y-[30px]'>
          {Array.from(Array(10)).map((_, index) => {
            return <MemberCard key={index} />;
          })}
        </div>
      </section>
    </>
  );
};

export default HonoraryMembersPage;
