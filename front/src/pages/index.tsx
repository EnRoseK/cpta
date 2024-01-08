import { getClients, getPaginatedBlogs, getStatistics } from '@/api/services';
import { Clients, HomeCTA, LatestNews, NewsSlider, Statistics } from '@/components/sections';
import { IBlog, IClient, IStatistic } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';

interface HomeProps {
  blogs: IBlog[];
  sliderBlogs: IBlog[];
  statistics: IStatistic[];
  clients: IClient[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const [sliderBlogsRes, blogsRes, statisticsRes, clientsRes] = await Promise.all([
    getPaginatedBlogs({ locale: locale as string, pageSize: 10, filters: { showOnSlider: { $eq: true } } }),
    getPaginatedBlogs({ locale: locale as string, pageSize: 3 }),
    getStatistics({ locale: locale as string }),
    getClients({ locale: locale as string, limit: 20, fields: ['id', 'name'] }),
  ]);

  return {
    props: {
      blogs: blogsRes.data,
      sliderBlogs: sliderBlogsRes.data,
      statistics: statisticsRes.data,
      clients: clientsRes.data,
    },
  };
};

const HomePage: NextPage<HomeProps> = ({ blogs, sliderBlogs, statistics, clients }) => {
  return (
    <>
      <NewsSlider blogs={sliderBlogs} />
      <LatestNews blogs={blogs} />
      <Statistics statistics={statistics} />
      <Clients clients={clients} />
      <HomeCTA />
    </>
  );
};

export default HomePage;
