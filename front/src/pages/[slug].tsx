import { getStaticPageBySlug, getStaticPageSlugs } from '@/api/services';
import { PageHeader } from '@/components/global';
import { IStaticPage } from '@/interfaces';
import { parseMarkDown } from '@/utils';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

interface StaticPageProps {
  staticPageInfo: IStaticPage;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getStaticPageSlugs({ locale: 'all' });
  const paths = res.data.map((s) => ({ params: { slug: s.slug }, locale: s.locale }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<StaticPageProps> = async ({ params, locale }) => {
  try {
    const res = await getStaticPageBySlug(params?.slug as string, locale as string);

    if (res.data.length === 0) {
      throw new Error();
    }

    return {
      props: {
        staticPageInfo: res.data[0],
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const StaticPage: NextPage<StaticPageProps> = ({ staticPageInfo }) => {
  const router = useRouter();
  const content = parseMarkDown(staticPageInfo.pageContent);

  return (
    <>
      <PageHeader
        title={staticPageInfo.pageTitle}
        pages={[{ title: staticPageInfo.pageTitle, link: router.pathname }]}
      />

      <section className='container py-[120px]'>
        <div className='blog-details' dangerouslySetInnerHTML={{ __html: content }}></div>
      </section>
    </>
  );
};

export default StaticPage;
