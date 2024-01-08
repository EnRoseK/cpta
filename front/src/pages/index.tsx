import { getPaginatedBlogs } from '@/api/services';
import { getStatistics } from '@/api/services/statistics';
import { Clients, HomeCTA, LatestNews, NewsSlider, Statistics } from '@/components/sections';
import { IBlog, IStatistic } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';

interface HomeProps {
  blogs: IBlog[];
  sliderBlogs: IBlog[];
  statistics: IStatistic[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [sliderBlogsRes, blogsRes, statisticsRes] = await Promise.all([
    getPaginatedBlogs({ locale: 'mn', pageSize: 10, filters: { showOnSlider: { $eq: true } } }),
    getPaginatedBlogs({ locale: 'mn', pageSize: 3 }),
    getStatistics({ locale: 'mn' }),
  ]);

  return {
    props: {
      blogs: blogsRes.data,
      sliderBlogs: sliderBlogsRes.data,
      statistics: statisticsRes.data,
    },
  };
};

const HomePage: NextPage<HomeProps> = ({ blogs, sliderBlogs, statistics }) => {
  return (
    <>
      <NewsSlider blogs={sliderBlogs} />
      <LatestNews blogs={blogs} />
      <Statistics statistics={statistics} />
      <Clients />
      <HomeCTA />
    </>
  );
};

export default HomePage;
