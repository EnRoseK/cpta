import { Clients, HomeCTA, LatestNews, NewsSlider, Statistics } from '@/components/sections';

export default function Home() {
  return (
    <>
      <NewsSlider />
      <LatestNews />
      <Statistics />
      <Clients />
      <HomeCTA />
    </>
  );
}
