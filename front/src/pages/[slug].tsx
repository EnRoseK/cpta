import { getStaticPageBySlug, getStaticPageSlugs } from '@/api/services';
import { PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IStaticPage } from '@/interfaces';
import { convertAttachmentUrl, parseMarkDown } from '@/utils';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

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
  const pdfFiles = staticPageInfo.pdfFiles?.filter((file) => file.file.mime.includes('pdf'));
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${staticPageInfo.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={staticPageInfo.pageDescription}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}${
          currentLocale === 'mn' ? `/${staticPageInfo.slug}` : `/en/${staticPageInfo.slug}`
        }`}
        openGraph={{
          title: `${staticPageInfo.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: staticPageInfo.pageDescription,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${
            currentLocale === 'mn' ? `/${staticPageInfo.slug}` : `/en/${staticPageInfo.slug}`
          }`,
        }}
      />

      <PageHeader
        title={staticPageInfo.pageTitle}
        pages={[{ title: staticPageInfo.pageTitle, link: router.pathname }]}
      />

      <section className='container py-[120px]'>
        {pdfFiles && pdfFiles.length > 0 && (
          <div className='mb-10 flex flex-col items-center justify-center gap-10'>
            {pdfFiles.map((file) => {
              return (
                <iframe
                  key={file.id}
                  src={convertAttachmentUrl(file.file.url) + '#view=FitH'}
                  className='aspect-[1/1.39] w-[60%]'
                  allowFullScreen
                />
              );
            })}
          </div>
        )}

        <div className='blog-details' dangerouslySetInnerHTML={{ __html: content }}></div>
      </section>
    </>
  );
};

export default StaticPage;
