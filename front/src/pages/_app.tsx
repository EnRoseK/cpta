import 'swiper/css';
import '@/styles/globals.css';
import { MainLayout } from '@/layouts';
import type { AppProps } from 'next/app';
import NextProgress from 'next-progress';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>

      <NextProgress options={{ showSpinner: false }} color='#3764EB' />
    </>
  );
}
