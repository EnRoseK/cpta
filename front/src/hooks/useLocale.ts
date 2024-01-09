import { useRouter } from 'next/router';

export const useLocale = () => {
  const router = useRouter();
  const locale = router.locale;

  const switchLocale = () => {
    router.push(router.asPath, undefined, { locale: locale === 'mn' ? 'en' : 'mn' });
  };

  return { currentLocale: locale, switchLocale };
};
