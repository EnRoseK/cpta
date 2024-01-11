import { getClients, getHomePage, getPaginatedBlogs, getStatistics } from '@/api/services';
import { Clients, HomeCTA, LatestNews, NewsSlider, Statistics } from '@/components/sections';
import { useLocale } from '@/hooks';
import { IBlog, IClient, IHomePage, IStatistic } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface HomeProps {
  blogs: IBlog[];
  sliderBlogs: IBlog[];
  statistics: IStatistic[];
  clients: IClient[];
  homePageInfo: IHomePage;
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const [sliderBlogsRes, blogsRes, statisticsRes, clientsRes, homePageInfoRes] = await Promise.all([
    getPaginatedBlogs({ locale: locale as string, pageSize: 10, filters: { showOnSlider: { $eq: true } } }),
    getPaginatedBlogs({ locale: locale as string, pageSize: 3 }),
    getStatistics({ locale: locale as string }),
    getClients({ locale: locale as string, limit: 20, fields: ['id', 'name'] }),
    getHomePage({ locale: locale as string }),
  ]);

  return {
    props: {
      blogs: blogsRes.data,
      sliderBlogs: sliderBlogsRes.data,
      statistics: statisticsRes.data,
      clients: clientsRes.data,
      homePageInfo: homePageInfoRes.data,
    },
  };
};

const HomePage: NextPage<HomeProps> = ({ blogs, sliderBlogs, statistics, clients, homePageInfo }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${homePageInfo.pageTitle} | ${
          currentLocale === 'mn'
            ? 'Монгол Улсын Татварын Мэргэшсэн Зөвлөхийн нийгэмлэг'
            : 'Mongolian Association of Certified Tax Consultants'
        }`}
        description={homePageInfo.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL}
        openGraph={{
          title: `${homePageInfo.pageTitle} | ${
            currentLocale === 'mn'
              ? 'Монгол Улсын Татварын Мэргэшсэн Зөвлөхийн нийгэмлэг'
              : 'Mongolian Association of Certified Tax Consultants'
          }`,
          description: homePageInfo.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL,
          images: sliderBlogs
            .filter((blog) => blog.thumbnail.mime.includes('image'))
            .map((blog) => ({
              url: convertAttachmentUrl(blog.thumbnail.url),
              width: blog.thumbnail.width,
              height: blog.thumbnail.height,
            })),
        }}
      />

      <NewsSlider blogs={sliderBlogs} />
      <LatestNews blogs={blogs} sectionInfo={homePageInfo.newsSection} />
      <Statistics statistics={statistics} />
      <Clients clients={clients} sectionInfo={homePageInfo.clientsSection} />
      <HomeCTA ctas={homePageInfo.cta} />
    </>
  );
};

export default HomePage;
