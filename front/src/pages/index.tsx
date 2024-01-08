import { getPaginatedBlogs } from '@/api/services';
import { Clients, HomeCTA, LatestNews, NewsSlider, Statistics } from '@/components/sections';
import { IBlog } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';

interface HomeProps {
  blogs: IBlog[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [blogsRes] = await Promise.all([getPaginatedBlogs({ locale: 'mn', pageSize: 3 })]);

  return {
    props: {
      blogs: blogsRes.data,
    },
  };
};

const HomePage: NextPage<HomeProps> = ({ blogs }) => {
  return (
    <>
      <NewsSlider />
      <LatestNews blogs={blogs} />
      <Statistics />
      <Clients />
      <HomeCTA />
    </>
  );
};

export default HomePage;
