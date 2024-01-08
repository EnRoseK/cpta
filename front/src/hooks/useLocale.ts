import { useRouter } from 'next/router';

export const useLocale = () => {
  const router = useRouter();
  const { locale = 'mn' } = router.query;

  const switchLocale = () => {
    if (locale === 'mn') {
      router.push({ query: { ...router.query, locale: 'en' } });
    } else if (locale === 'en') {
      delete router.query.locale;
      router.push({ query: router.query });
    }
  };

  return { currentLocale: locale, switchLocale };
};
