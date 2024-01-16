import { getExamResultsPage } from '@/api/services';
import { Dropdown, PageHeader, SearchInput } from '@/components/global';
import { ChallengeExam, GrantRightsExam, LicenseExtendExam } from '@/components/sections';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IExamResultsPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

interface ExamResultsPageProps {
  examResultsPage: IExamResultsPage;
}

export const getStaticProps: GetStaticProps<ExamResultsPageProps> = async ({ locale }) => {
  const res = await getExamResultsPage({ locale: locale as string });

  return {
    props: {
      examResultsPage: res.data,
    },
  };
};

const ExamResultsPage: NextPage<ExamResultsPageProps> = ({ examResultsPage }) => {
  const { currentLocale } = useLocale();

  const [search, setSearch] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<string>('grant-rights');
  const [didSearch, setDidSearch] = useState<boolean>(false);

  const onSearchSubmit = () => {
    if (search) {
      setDidSearch(true);
    } else {
      setDidSearch(false);
    }
  };

  useEffect(() => {
    setDidSearch(false);
    setSearch('');
  }, [selectedExam]);

  return (
    <>
      <NextSeo
        title={`${examResultsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={examResultsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/exam-results'}
        openGraph={{
          title: `${examResultsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: examResultsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/exam-results',
        }}
      />

      <PageHeader
        title={examResultsPage.pageTitle}
        pages={[{ title: examResultsPage.pageTitle, link: '/exam-results' }]}
      />

      <section className='container py-20 lg:py-[120px]'>
        <div className='mb-15 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center'>
          <Dropdown
            items={[
              { label: 'ТМЗ-ийн эрх олгох шалгалтын дүн', value: 'grant-rights' },
              { label: 'Сорил шалгалтын дүн', value: 'challenge' },
              { label: 'ТМЗ-ийн эрх сунгах шалгалтын дүн', value: 'license-extend' },
            ]}
            selectedValue={selectedExam}
            onChangeHandler={setSelectedExam}
          />
          <SearchInput
            placeholder={currentLocale === 'mn' ? 'Хайх' : 'Search'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={onSearchSubmit}
          />
        </div>

        {selectedExam === 'grant-rights' && (
          <GrantRightsExam
            grantRightsExam={examResultsPage.grantRightExamSection}
            search={search}
            didSearch={didSearch}
          />
        )}
        {selectedExam === 'challenge' && (
          <ChallengeExam challengeExam={examResultsPage.challengeExamSection} search={search} didSearch={didSearch} />
        )}
        {selectedExam === 'license-extend' && (
          <LicenseExtendExam licenseExtendExam={examResultsPage.licenseExtendSection} />
        )}
      </section>
    </>
  );
};

export default ExamResultsPage;
