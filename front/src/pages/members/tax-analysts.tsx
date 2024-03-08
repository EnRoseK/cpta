import { getPaginatedTaxAnalysts, getTaxAnalystsPage } from '@/api/services';
import { Button, Input, PageHeader, TaxAnalystCard } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { ITaxAnalyst, ITaxAnalystsPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface TaxAnalystsPageProps {
  taxAnalysts: ITaxAnalyst[];
  taxAnalystsPage: ITaxAnalystsPage;
}

export const getStaticProps: GetStaticProps<TaxAnalystsPageProps> = async ({ locale }) => {
  const [taxAnalystsRes, taxAnalystsPageRes] = await Promise.all([
    getPaginatedTaxAnalysts({ locale: locale as string }),
    getTaxAnalystsPage({ locale: locale as string }),
  ]);

  return {
    props: {
      taxAnalysts: taxAnalystsRes.data,
      taxAnalystsPage: taxAnalystsPageRes.data,
    },
  };
};

const TaxAnalystsPage: NextPage<TaxAnalystsPageProps> = ({ taxAnalysts, taxAnalystsPage }) => {
  const { currentLocale } = useLocale();

  const [displayTaxAnalysts, setDisplayTaxAnalysts] = useState<ITaxAnalyst[]>(taxAnalysts);
  const [formValues, setFormValues] = useState({ firstName: '', lastName: '' });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = () => {
    if (!formValues.firstName && !formValues.lastName) {
      return setDisplayTaxAnalysts(taxAnalysts);
    }

    if (formValues.firstName && !formValues.lastName) {
      return setDisplayTaxAnalysts(
        taxAnalysts.filter((t) => t.firstName.toLowerCase().includes(formValues.firstName.toLowerCase())),
      );
    }

    if (!formValues.firstName && formValues.lastName) {
      return setDisplayTaxAnalysts(
        taxAnalysts.filter((t) => t.lastName.toLowerCase().includes(formValues.lastName.toLowerCase())),
      );
    }

    setDisplayTaxAnalysts(
      taxAnalysts.filter(
        (t) =>
          formValues.firstName &&
          t.firstName.toLowerCase().includes(formValues.firstName.toLowerCase()) &&
          formValues.lastName &&
          t.lastName.toLowerCase().includes(formValues.lastName.toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    setDisplayTaxAnalysts(taxAnalysts);
  }, [taxAnalysts]);

  return (
    <>
      <NextSeo
        title={`${taxAnalystsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={taxAnalystsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/members/tax-analysts'}
        openGraph={{
          title: `${taxAnalystsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: taxAnalystsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/members/tax-analysts',
        }}
      />

      <PageHeader
        title={taxAnalystsPage.pageTitle}
        pages={[{ title: taxAnalystsPage.pageTitle, link: '/members/tax-analysts' }]}
      />

      <section className='container py-20 lg:py-[120px]'>
        <div className='grid grid-cols-1 gap-15 md:grid-cols-3 lg:grid-cols-5'>
          <aside className='col-span-1'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler();
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
                onChange={onChangeHandler}
                placeholder={currentLocale === 'mn' ? 'Овог' : 'Lastname'}
              />
              <Input
                id='firstName'
                name='firstName'
                value={formValues.firstName}
                onChange={onChangeHandler}
                placeholder={currentLocale === 'mn' ? 'Нэр' : 'Firstname'}
              />
              <Button type='submit' size='small'>
                {currentLocale === 'mn' ? 'Хайх' : 'Search'}
              </Button>
            </form>
          </aside>

          <div className='col-span-1 md:col-span-2 lg:col-span-4'>
            {displayTaxAnalysts.length > 0 && (
              <div className='mb-15 grid grid-cols-1 gap-x-6 gap-y-[30px] min-[500px]:grid-cols-2 lg:grid-cols-4'>
                {displayTaxAnalysts.map((taxAnalyst) => {
                  return <TaxAnalystCard key={taxAnalyst.id} taxAnalyst={taxAnalyst} />;
                })}
              </div>
            )}
            {displayTaxAnalysts.length === 0 && (
              <div className='flex h-[200px] w-full items-center justify-center'>
                <p className='text-xl font-medium text-description'>
                  {currentLocale === 'mn' ? 'Илэрц олдсонгүй' : 'No record found'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TaxAnalystsPage;
