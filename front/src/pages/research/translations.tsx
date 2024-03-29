/* eslint-disable react-hooks/exhaustive-deps */
import { getTranslations, getTranslationsCategories, getTranslationsPage } from '@/api/services';
import { Button, Dropdown, PageHeader, SearchInput } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { ITranslations, ITranslationsCategory, ITranslationsPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

const tableHeaders = [
  {
    mn: 'Англи',
    en: 'English',
  },
  {
    mn: 'Монгол',
    en: 'Mongolian',
  },
  {
    mn: 'Орчуулсан гишүүний нэр',
    en: 'Translator names',
  },
  {
    mn: 'Орчуулсан он',
    en: 'Translated year',
  },
  {
    mn: 'Ангилал',
    en: 'Category',
  },
  {
    mn: 'Үзэх',
    en: 'Watch',
  },
];

interface TranslationsPageProps {
  translationsPage: ITranslationsPage;
  translations: ITranslations[];
  categories: ITranslationsCategory[];
}

export const getStaticProps: GetStaticProps<TranslationsPageProps> = async ({ locale }) => {
  const [translationsPageRes, translationsRes, categoriesRes] = await Promise.all([
    getTranslationsPage({ locale: locale as string }),
    getTranslations({ locale: locale as string }),
    getTranslationsCategories({ locale: locale as string }),
  ]);

  return {
    props: {
      translationsPage: translationsPageRes.data,
      translations: translationsRes.data,
      categories: categoriesRes.data,
    },
  };
};

const TranslationsPage: NextPage<TranslationsPageProps> = ({ translationsPage, translations, categories }) => {
  const { currentLocale } = useLocale();
  const availableYears = Array.from(new Set(translations.map((translation) => translation.translatedYear)));
  const [displayTranslations, setDisplayTranslations] = useState<ITranslations[]>(translations);

  const [searchName, setSearchName] = useState<string>('');
  const [searchTranslator, setSearchTranslator] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filterTranslations = () => {
    let copyTranslations = [...translations];

    if (searchName) {
      copyTranslations = copyTranslations.filter(
        (trans) =>
          trans.englishName.toLowerCase().includes(searchName.toLowerCase()) ||
          trans.mongolianName.toLowerCase().includes(searchName.toLowerCase()),
      );
    }

    if (searchTranslator) {
      copyTranslations = copyTranslations.filter((trans) =>
        trans.translators.toLowerCase().includes(searchTranslator.toLowerCase()),
      );
    }

    if (selectedYear) {
      copyTranslations = copyTranslations.filter((trans) => trans.translatedYear === selectedYear);
    }

    if (selectedCategory) {
      copyTranslations = copyTranslations.filter((trans) => trans.category?.slug === selectedCategory);
    }

    setDisplayTranslations(copyTranslations);
  };

  useEffect(() => {
    setDisplayTranslations(translations);
  }, [translations]);

  useEffect(() => {
    filterTranslations();
  }, [selectedYear, selectedCategory]);

  useEffect(() => {
    setSearchName('');
    setSearchTranslator('');
    setSelectedYear('');
  }, [currentLocale]);

  return (
    <>
      <NextSeo
        title={`${translationsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={translationsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/research/translations'}
        openGraph={{
          title: `${translationsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: translationsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/research/translations',
        }}
      />

      <PageHeader
        title={translationsPage.pageTitle}
        pages={[{ title: translationsPage.pageTitle, link: '/research/translations' }]}
      />

      <section className='container py-20 lg:py-[120px]'>
        <div className='mb-15 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <SearchInput
              placeholder={currentLocale === 'mn' ? 'Сэдвээр хайх' : 'Search by name'}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onSubmit={filterTranslations}
            />
            <SearchInput
              placeholder={currentLocale === 'mn' ? 'Орчуулагчаар хайх' : 'Search by translators'}
              value={searchTranslator}
              onChange={(e) => setSearchTranslator(e.target.value)}
              onSubmit={filterTranslations}
            />
          </div>

          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <Dropdown
              items={categories.map((category) => ({ value: category.slug, label: category.name }))}
              placeholder={currentLocale === 'mn' ? 'Ангилалаар хайх' : 'Search by category'}
              selectedValue={selectedCategory}
              onChangeHandler={setSelectedCategory}
              showAll
            />
            <Dropdown
              items={availableYears.map((year) => ({ value: year, label: year }))}
              placeholder={currentLocale === 'mn' ? 'Оноор хайх' : 'Search by year'}
              selectedValue={selectedYear}
              onChangeHandler={setSelectedYear}
              showAll
            />
          </div>
        </div>

        <div className='relative overflow-x-auto sm:rounded-lg'>
          <table className='w-full text-left text-base text-dark'>
            <thead className='dark:bg-gray-700 bg-gray text-sm uppercase text-dark'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  #
                </th>
                {tableHeaders.map((header, index) => {
                  return (
                    <th key={index} scope='col' className='px-6 py-3'>
                      {header[currentLocale! as 'mn' | 'en']}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {displayTranslations.map((translation, index) => {
                return (
                  <tr
                    key={translation.id}
                    className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'
                  >
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td scope='row' className='px-6 py-4'>
                      {translation.englishName}
                    </td>
                    <td scope='row' className='px-6 py-4'>
                      {translation.mongolianName}
                    </td>
                    <td className='px-6 py-4'>{translation.translators}</td>
                    <td className='px-6 py-4'>{translation.translatedYear}</td>
                    <td className='px-6 py-4'>{translation.category?.name}</td>
                    <td className='px-6 py-4'>
                      {translation.link && (
                        <Button asLink href={translation.link} newTab={translation.newTab} size='small'>
                          {currentLocale === 'mn' ? 'Үзэх' : 'Watch'}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {displayTranslations.length === 0 && (
                <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                  <th colSpan={6} scope='row' className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'>
                    {currentLocale === 'mn' ? 'Илэрц олдсонгүй' : 'No record found'}
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default TranslationsPage;
