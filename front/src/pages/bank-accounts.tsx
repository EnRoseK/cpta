import { getBankAccountsPage } from '@/api/services';
import { PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IBankAccountsPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const tableHeaders = [
  { mn: 'Банкны нэр', en: 'Bank name' },
  { mn: 'Дансны дугаар', en: 'Account number' },
  { mn: 'Хүлээн авагчийн нэр', en: 'Reciever name' },
  { mn: 'Гүйлгээний утга', en: 'Transaction value' },
  { mn: 'И-баримт', en: 'E-barimt' },
];

interface BankAccountsPageProps {
  bankAccountsPage: IBankAccountsPage;
}

export const getStaticProps: GetStaticProps<BankAccountsPageProps> = async ({ locale }) => {
  const res = await getBankAccountsPage({ locale: locale as string });

  return {
    props: {
      bankAccountsPage: res.data,
    },
  };
};

const BankAccountsPage: NextPage<BankAccountsPageProps> = ({ bankAccountsPage }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${bankAccountsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={bankAccountsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/bank-accounts'}
        openGraph={{
          title: `${bankAccountsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: bankAccountsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/bank-accounts',
        }}
      />

      <PageHeader
        title={bankAccountsPage.pageTitle}
        pages={[{ title: bankAccountsPage.pageTitle, link: '/bank-accounts' }]}
      />

      <section className='container py-[120px]'>
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
              {bankAccountsPage.bankAccounts.map((bankAccount, index) => {
                return (
                  <tr
                    key={bankAccount.id}
                    className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'
                  >
                    <td className='px-6 py-4'>{index + 1}</td>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-dark '>
                      {bankAccount.bankName}
                    </th>
                    <td className='px-6 py-4'>{bankAccount.accountNumber}</td>
                    <td className='px-6 py-4'>{bankAccount.accountName}</td>
                    <td className='px-6 py-4'>{bankAccount.transferValue}</td>
                    <td className='px-6 py-4'>{bankAccount.eBarimt}</td>
                  </tr>
                );
              })}

              {bankAccountsPage.bankAccounts.length === 0 && (
                <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                  <th colSpan={5} scope='row' className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'>
                    Илэрц олдсонгүй
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

export default BankAccountsPage;
