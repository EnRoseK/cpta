import { getAllHonoraryMembers } from '@/api/services';
import { MemberCard, PageHeader } from '@/components/global';
import { IHonoraryMember } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';

interface HonoraryMembersPageProps {
  honoraryMembers: IHonoraryMember[];
}

export const getStaticProps: GetStaticProps<HonoraryMembersPageProps> = async ({ locale }) => {
  const [honoraryMembersRes] = await Promise.all([getAllHonoraryMembers({ locale: locale as string })]);

  return {
    props: {
      honoraryMembers: honoraryMembersRes.data,
    },
  };
};

const HonoraryMembersPage: NextPage<HonoraryMembersPageProps> = ({ honoraryMembers }) => {
  return (
    <>
      <PageHeader title='Хүндэт гишүүд' pages={[{ title: 'Хүндэт гишүүд', link: '/members/honorary' }]} />
      <section className='container py-[120px]'>
        <div className='grid grid-cols-4 gap-x-6 gap-y-[30px]'>
          {honoraryMembers.map((honoraryMember) => {
            return <MemberCard honoraryMember={honoraryMember} key={honoraryMember.id} />;
          })}
        </div>
      </section>
    </>
  );
};

export default HonoraryMembersPage;
