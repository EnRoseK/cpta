import { getTaxSpecialistsPage } from '@/api/services';
import { Button, Input, PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { ITaxSepcialistsPage } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import classNames from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useEffect, useState } from 'react';
import readXlsxFile, { Row } from 'read-excel-file';

const returnDataRows = async (url: string, sheet: number) => {
  const rows = await fetch(convertAttachmentUrl(url))
    .then((res) => res.blob())
    .then((res) => readXlsxFile(res, { sheet }));

  return rows.filter((row) => typeof row[0] === 'number');
};

const tableHeaders = [
  { mn: 'ТМЗ-ийн гэрчилгээний дугаар', en: 'License number' },
  { mn: 'Овог', en: 'Lastname' },
  { mn: 'Нэр', en: 'Firstname' },
  { mn: 'Төлөв', en: 'Status' },
];

interface TaxSpecialistsPageProps {
  taxSpecialistsPage: ITaxSepcialistsPage;
}

interface TaxSpecialist {
  id: number;
  licenseNumber: string;
  lastName: string;
  firstName: string;
  isExpired: boolean;
}

export const getStaticProps: GetStaticProps<TaxSpecialistsPageProps> = async ({ locale }) => {
  const res = await getTaxSpecialistsPage({ locale: locale as string });

  return {
    props: {
      taxSpecialistsPage: res.data,
    },
  };
};

const TaxSpecialistsPage: NextPage<TaxSpecialistsPageProps> = ({ taxSpecialistsPage }) => {
  const { currentLocale } = useLocale();
  const [taxSpecialists, setTaxSpecialists] = useState<TaxSpecialist[]>([]);
  const [displayTaxSpecialists, setDisplayTaxSpecialists] = useState<TaxSpecialist[]>([]);
  const [formValues, setFormValues] = useState({ firstName: '', lastName: '' });
  const [didSearch, setDidSearch] = useState<boolean>(false);

  useEffect(() => {
    const getDataFromFile = async () => {
      let rows: Row[] = [];

      for (const file of taxSpecialistsPage.files) {
        const resOne = await returnDataRows(file.excelFile.url, 1);
        const resTwo = await returnDataRows(file.excelFile.url, 2);

        rows = [...rows, ...resOne, ...resTwo];
      }

      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;

      const result = rows.map((row) => {
        let isExpired: boolean;

        const expiryDate = row[5]?.toString() || null;
        const expiryYear = +(expiryDate?.split('/')[0] || year);
        const expiryMonth = +(expiryDate?.split('/')[1] || month);

        if (expiryDate) {
          if (expiryYear > year) {
            isExpired = false;
          } else if (expiryYear === year) {
            if (expiryMonth > month) {
              isExpired = false;
            } else {
              isExpired = true;
            }
          } else {
            isExpired = true;
          }
        } else {
          isExpired = true;
        }

        return {
          id: +row[0]?.toString() || 0,
          licenseNumber: row[1]?.toString(),
          lastName: row[2]?.toString(),
          firstName: row[3]?.toString(),
          isExpired,
        };
      });

      setTaxSpecialists(result);
      setDisplayTaxSpecialists([]);
    };

    getDataFromFile();
    setFormValues({ firstName: '', lastName: '' });
    setDidSearch(false);
  }, [taxSpecialistsPage.files]);

  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSearchSubmitHandler = () => {
    if (!formValues.firstName || !formValues.lastName) {
      return;
    }

    setDisplayTaxSpecialists(
      taxSpecialists.filter(
        (specialist) =>
          specialist.firstName?.toLowerCase().includes(formValues.firstName.toLowerCase()) &&
          specialist.lastName?.toLowerCase().includes(formValues.lastName.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <NextSeo
        title={`${taxSpecialistsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={taxSpecialistsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/members/tax-specialists'}
        openGraph={{
          title: `${taxSpecialistsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: taxSpecialistsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/members/tax-specialists',
        }}
      />

      <PageHeader
        title={taxSpecialistsPage.pageTitle}
        pages={[{ title: taxSpecialistsPage.pageTitle, link: '/members/tax-specialists' }]}
      />

      <section className='container py-20 lg:py-[120px]'>
        <div className='grid grid-cols-1 gap-15 md:grid-cols-3 lg:grid-cols-5'>
          <aside className='col-span-1'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmitHandler();
              }}
              className='space-y-5'
            >
              <h6 className='text-xl font-bold leading-normal text-dark'>
                {currentLocale === 'mn' ? 'Хайх' : 'Search'}
              </h6>
              <Input
                id='lastName'
                name='lastName'
                value={formValues.lastName}
                onChange={inputOnChangeHandler}
                placeholder={currentLocale === 'mn' ? 'Овог' : 'Lastname'}
              />
              <Input
                id='firstName'
                name='firstName'
                value={formValues.firstName}
                onChange={inputOnChangeHandler}
                placeholder={currentLocale === 'mn' ? 'Нэр' : 'Firstname'}
              />
              <Button type='submit' size='small'>
                {currentLocale === 'mn' ? 'Хайх' : 'Search'}
              </Button>
            </form>
          </aside>

          <div className='col-span-1 md:col-span-2 lg:col-span-4'>
            {taxSpecialistsPage.smallTitle && (
              <h3 className='mb-10 text-center text-xl text-dark'>{taxSpecialistsPage.smallTitle}</h3>
            )}

            {taxSpecialistsPage.smallSubTitle && (
              <span className='mb-5 block text-end text-base italic text-description'>
                {taxSpecialistsPage.smallSubTitle}
              </span>
            )}

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
                  {displayTaxSpecialists.map((taxSpecialist, index) => {
                    return (
                      <tr
                        key={index}
                        className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'
                      >
                        <td className='px-6 py-4'>{index + 1}</td>
                        <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-dark '>
                          {taxSpecialist.licenseNumber}
                        </th>
                        <td className='px-6 py-4'>{taxSpecialist.lastName}</td>
                        <td className='px-6 py-4'>{taxSpecialist.firstName}</td>
                        <td className='px-6 py-4'>
                          <span
                            className={classNames({
                              'text-green-600': !taxSpecialist.isExpired,
                              'text-red-600': taxSpecialist.isExpired,
                            })}
                          >
                            {taxSpecialist.isExpired ? 'Хүчингүй' : 'Хүчинтэй'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {displayTaxSpecialists.length === 0 && (
                    <>
                      {didSearch ? (
                        <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                          <th
                            colSpan={5}
                            scope='row'
                            className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'
                          >
                            {currentLocale === 'mn' ? 'Илэрц олдсонгүй' : 'No record found'}
                          </th>
                        </tr>
                      ) : (
                        <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                          <th
                            colSpan={5}
                            scope='row'
                            className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'
                          >
                            {currentLocale === 'mn' ? 'Хайлт хийнэ үү' : 'Search to see results'}
                          </th>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaxSpecialistsPage;
