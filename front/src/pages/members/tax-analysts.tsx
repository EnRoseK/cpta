import { getPaginatedTaxAnalysts } from '@/api/services';
import { Button, Input, PageHeader, TaxAnalystCard } from '@/components/global';
import { ITaxAnalyst } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import React, { ChangeEvent, useState } from 'react';

interface TaxAnalystsPageProps {
  taxAnalysts: ITaxAnalyst[];
}

export const getStaticProps: GetStaticProps<TaxAnalystsPageProps> = async ({ locale }) => {
  const res = await getPaginatedTaxAnalysts({ locale: locale as string });

  return {
    props: {
      taxAnalysts: res.data,
    },
  };
};

const TaxAnalystsPage: NextPage<TaxAnalystsPageProps> = ({ taxAnalysts }) => {
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

  return (
    <>
      <PageHeader title='Татварын шинжээч' pages={[{ title: 'Татварын шинжээч', link: '/members/tax-analysts' }]} />

      <section className='container py-[120px]'>
        <div className='grid grid-cols-5 gap-15'>
          <aside className='sticky top-44 col-span-1 h-max'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler();
              }}
              className='space-y-5'
            >
              <h6 className='text-xl font-bold leading-normal text-dark'>Хайх</h6>
              <Input
                id='lastName'
                name='lastName'
                value={formValues.lastName}
                onChange={onChangeHandler}
                placeholder='Овог'
              />
              <Input
                id='firstName'
                name='firstName'
                value={formValues.firstName}
                onChange={onChangeHandler}
                placeholder='Нэр'
              />
              <Button type='submit' size='small'>
                Хайх
              </Button>
            </form>
          </aside>

          <div className='col-span-4'>
            {displayTaxAnalysts.length > 0 && (
              <div className='mb-15 grid grid-cols-3 gap-x-6 gap-y-[30px]'>
                {displayTaxAnalysts.map((taxAnalyst) => {
                  return <TaxAnalystCard key={taxAnalyst.id} taxAnalyst={taxAnalyst} />;
                })}
              </div>
            )}
            {displayTaxAnalysts.length === 0 && (
              <div className='flex h-[200px] w-full items-center justify-center'>
                <p className='text-xl font-medium text-description'>Илэрц олдсонгүй</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TaxAnalystsPage;
