import 'swiper/css';
import '@/styles/globals.css';
import { MainLayout } from '@/layouts';
import type { AppProps } from 'next/app';
import NextProgress from 'next-progress';
import { GlobalProvider } from '@/providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </GlobalProvider>

      <NextProgress options={{ showSpinner: false }} color='#3764EB' />
    </>
  );
}
