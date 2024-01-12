import { getAllHonoraryMembers, getHonoraryMemberPage } from '@/api/services';
import { MemberCard, PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IHonoraryMember, IHonoraryMemberPage } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface HonoraryMembersPageProps {
  honoraryMembers: IHonoraryMember[];
  honoraryMemberPage: IHonoraryMemberPage;
}

export const getStaticProps: GetStaticProps<HonoraryMembersPageProps> = async ({ locale }) => {
  const [honoraryMembersRes, honoraryMemberPageRes] = await Promise.all([
    getAllHonoraryMembers({ locale: locale as string }),
    getHonoraryMemberPage({ locale: locale as string }),
  ]);

  return {
    props: {
      honoraryMembers: honoraryMembersRes.data,
      honoraryMemberPage: honoraryMemberPageRes.data,
    },
  };
};

const HonoraryMembersPage: NextPage<HonoraryMembersPageProps> = ({ honoraryMembers, honoraryMemberPage }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${honoraryMemberPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={honoraryMemberPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/members/honorary'}
        openGraph={{
          title: `${honoraryMemberPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: honoraryMemberPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/members/honorary',
          images: honoraryMembers.map((member) => ({
            url: convertAttachmentUrl(member.picture.url),
            width: member.picture.width,
            height: member.picture.height,
          })),
        }}
      />

      <PageHeader
        title={honoraryMemberPage.pageTitle}
        pages={[{ title: honoraryMemberPage.pageTitle, link: '/members/honorary' }]}
      />
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
