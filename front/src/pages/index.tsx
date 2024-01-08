import { getPaginatedBlogs } from '@/api/services';
import { Clients, HomeCTA, LatestNews, NewsSlider, Statistics } from '@/components/sections';
import { IBlog } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';

interface HomeProps {
  blogs: IBlog[];
  sliderBlogs: IBlog[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [sliderBlogsRes, blogsRes] = await Promise.all([
    getPaginatedBlogs({ locale: 'mn', pageSize: 10, filters: { showOnSlider: { $eq: true } } }),
    getPaginatedBlogs({ locale: 'mn', pageSize: 3 }),
  ]);

  return {
    props: {
      blogs: blogsRes.data,
      sliderBlogs: sliderBlogsRes.data,
    },
  };
};

const HomePage: NextPage<HomeProps> = ({ blogs, sliderBlogs }) => {
  return (
    <>
      <NewsSlider blogs={blogs} />
      <LatestNews blogs={blogs} />
      <Statistics />
      <Clients />
      <HomeCTA />
    </>
  );
};

export default HomePage;
