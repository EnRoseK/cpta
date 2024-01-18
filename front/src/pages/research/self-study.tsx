/* eslint-disable react-hooks/exhaustive-deps */
import { getSelfStudies, getSelfStudyCategories, getSelfStudyPage } from '@/api/services';
import { Button, Dropdown, PageHeader, SearchInput } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { ISelfStudy, ISelfStudyCategory, ISelfStudyPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

const tableHeaders = [
  { mn: 'Судалгааны сэдэв', en: 'Research topic' },
  { mn: 'Нэр', en: 'Name' },
  { mn: 'Он', en: 'Year' },
  { mn: 'Ангилал', en: 'Category' },
  { mn: 'Үзэх', en: 'Watch' },
];

interface SelfStudyPageProps {
  selfStudyPage: ISelfStudyPage;
  selfStudies: ISelfStudy[];
  categories: ISelfStudyCategory[];
}

export const getStaticProps: GetStaticProps<SelfStudyPageProps> = async ({ locale }) => {
  const [selfStudyPageRes, selfStudiesRes, categoriesRes] = await Promise.all([
    getSelfStudyPage({ locale: locale as string }),
    getSelfStudies({ locale: locale as string }),
    getSelfStudyCategories({ locale: locale as string }),
  ]);

  return {
    props: {
      selfStudyPage: selfStudyPageRes.data,
      selfStudies: selfStudiesRes.data,
      categories: categoriesRes.data,
    },
  };
};

const SelfStudyPage: NextPage<SelfStudyPageProps> = ({ selfStudyPage, selfStudies, categories }) => {
  const { currentLocale } = useLocale();
  const availableYears = Array.from(new Set(selfStudies.map((selfStudy) => selfStudy.year)));

  const [displaySelfStudies, setDisplaySelfStudies] = useState<ISelfStudy[]>(selfStudies);

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [searchTopic, setSearchTopic] = useState<string>('');

  const filterSelfStudies = () => {
    let copySelfStudies = [...selfStudies];

    if (searchTopic) {
      copySelfStudies = copySelfStudies.filter((study) =>
        study.topicName.toLowerCase().includes(searchTopic.toLowerCase()),
      );
    }

    if (searchName) {
      copySelfStudies = copySelfStudies.filter((study) => study.names.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (selectedYear) {
      copySelfStudies = copySelfStudies.filter((study) => study.year === selectedYear);
    }

    if (selectedCategory) {
      copySelfStudies = copySelfStudies.filter((study) => study.category?.slug === selectedCategory);
    }

    setDisplaySelfStudies(copySelfStudies);
  };

  useEffect(() => {
    setSelectedYear('');
    setSearchName('');
    setSearchTopic('');
    setDisplaySelfStudies(selfStudies);
  }, [selfStudies]);

  useEffect(() => {
    filterSelfStudies();
  }, [selectedYear, selectedCategory]);

  return (
    <>
      <NextSeo
        title={`${selfStudyPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={selfStudyPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/research/self-study'}
        openGraph={{
          title: `${selfStudyPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: selfStudyPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/research/self-study',
        }}
      />

      <PageHeader
        title={selfStudyPage.pageTitle}
        pages={[{ title: selfStudyPage.pageTitle, link: '/research/self-study' }]}
      />

      <section className='container py-20 lg:py-[120px]'>
        <div className='mb-15 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <SearchInput
              placeholder={currentLocale === 'mn' ? 'Сэдвээр хайх' : 'Search by topic'}
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              onSubmit={filterSelfStudies}
            />
            <SearchInput
              placeholder={currentLocale === 'mn' ? 'Нэрээр хайх' : 'Search by name'}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onSubmit={filterSelfStudies}
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
              {displaySelfStudies.map((selfStudy, index) => {
                return (
                  <tr
                    key={selfStudy.id}
                    className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'
                  >
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td scope='row' className='px-6 py-4'>
                      {selfStudy.topicName}
                    </td>
                    <td scope='row' className='px-6 py-4'>
                      {selfStudy.names}
                    </td>
                    <td className='px-6 py-4'>{selfStudy.year}</td>
                    <td className='px-6 py-4'>{selfStudy.category?.name}</td>

                    <td className='px-6 py-4'>
                      {selfStudy.link && (
                        <Button asLink href={selfStudy.link} newTab={selfStudy.newTab} size='small'>
                          {currentLocale === 'mn' ? 'Үзэх' : 'Watch'}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {displaySelfStudies.length === 0 && (
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

export default SelfStudyPage;
