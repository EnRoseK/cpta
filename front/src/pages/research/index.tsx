/* eslint-disable react-hooks/exhaustive-deps */
import { getResearchCategories, getResearchPage, getResearchs } from '@/api/services';
import { Button, Dropdown, PageHeader, SearchInput } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IResearch, IResearchCategory, IResearchPage } from '@/interfaces';
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

interface ResearchPageProps {
  researchPage: IResearchPage;
  researchs: IResearch[];
  categories: IResearchCategory[];
}

export const getStaticProps: GetStaticProps<ResearchPageProps> = async ({ locale }) => {
  const [researchPageRes, researchsRes, categoriesRes] = await Promise.all([
    getResearchPage({ locale: locale as string }),
    getResearchs({ locale: locale as string }),
    getResearchCategories({ locale: locale as string }),
  ]);

  return {
    props: {
      researchPage: researchPageRes.data,
      researchs: researchsRes.data,
      categories: categoriesRes.data,
    },
  };
};

const ResearchPage: NextPage<ResearchPageProps> = ({ researchPage, researchs, categories }) => {
  const { currentLocale } = useLocale();
  const availableYears = Array.from(new Set(researchs.map((research) => research.year)));

  const [displayResearchs, setDisplayResearchs] = useState<IResearch[]>(researchs);

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [searchTopic, setSearchTopic] = useState<string>('');

  const filterResearchs = () => {
    let copyResearchs = [...researchs];

    if (searchTopic) {
      copyResearchs = copyResearchs.filter((study) =>
        study.topicName.toLowerCase().includes(searchTopic.toLowerCase()),
      );
    }

    if (searchName) {
      copyResearchs = copyResearchs.filter((study) => study.names.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (selectedYear) {
      copyResearchs = copyResearchs.filter((study) => study.year === selectedYear);
    }

    if (selectedCategory) {
      copyResearchs = copyResearchs.filter((study) => study.category?.slug === selectedCategory);
    }

    setDisplayResearchs(copyResearchs);
  };

  useEffect(() => {
    setSelectedYear('');
    setSearchName('');
    setSearchTopic('');
    setDisplayResearchs(researchs);
  }, [researchs]);

  useEffect(() => {
    filterResearchs();
  }, [selectedYear, selectedCategory]);

  return (
    <>
      <NextSeo
        title={`${researchPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={researchPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/research'}
        openGraph={{
          title: `${researchPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: researchPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/research',
        }}
      />

      <PageHeader title={researchPage.pageTitle} pages={[{ title: researchPage.pageTitle, link: '/research' }]} />

      <section className='container py-20 lg:py-[120px]'>
        <div className='mb-15 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <SearchInput
              placeholder={currentLocale === 'mn' ? 'Сэдвээр хайх' : 'Search by topic'}
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              onSubmit={filterResearchs}
            />
            <SearchInput
              placeholder={currentLocale === 'mn' ? 'Нэрээр хайх' : 'Search by name'}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onSubmit={filterResearchs}
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
              {displayResearchs.map((research, index) => {
                return (
                  <tr
                    key={research.id}
                    className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'
                  >
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td scope='row' className='px-6 py-4'>
                      {research.topicName}
                    </td>
                    <td scope='row' className='px-6 py-4'>
                      {research.names}
                    </td>
                    <td className='px-6 py-4'>{research.year}</td>
                    <td className='px-6 py-4'>{research.category?.name}</td>

                    <td className='px-6 py-4'>
                      {research.link && (
                        <Button asLink href={research.link} newTab={research.newTab} size='small'>
                          {currentLocale === 'mn' ? 'Үзэх' : 'Watch'}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {displayResearchs.length === 0 && (
                <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                  <th colSpan={5} scope='row' className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'>
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

export default ResearchPage;
