/* eslint-disable react-hooks/exhaustive-deps */
import { getClients, getClientsPage } from '@/api/services';
import { Dropdown, PageHeader, SearchInput } from '@/components/global';
import { UnverifiedClients, VerifiedClients } from '@/components/sections';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IClient, IClientsPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';

interface ClientsPageProps {
  clients: IClient[];
  clientsPage: IClientsPage;
}

export const getStaticProps: GetStaticProps<ClientsPageProps> = async ({ locale }) => {
  const [clientsRes, clientsPageRes] = await Promise.all([
    getClients({ locale: locale as string }),
    getClientsPage({ locale: locale as string }),
  ]);

  return {
    props: {
      clients: clientsRes.data,
      clientsPage: clientsPageRes.data,
    },
  };
};

const ClientsPage: NextPage<ClientsPageProps> = ({ clients, clientsPage }) => {
  const { currentLocale } = useLocale();

  const [selectedType, setSelectedType] = useState<string>('verified');
  const [search, setSearch] = useState<string>('');
  const originalVerifiedClients = clients.filter((c) => !c.isExpired);
  const originalUnverifiedClients = clients.filter((c) => c.isExpired);

  const [verifiedClients, setVerifiedClients] = useState<IClient[]>(originalVerifiedClients);
  const [unverifiedClients, setUnverifiedClients] = useState<IClient[]>(originalUnverifiedClients);

  const onSearchSubmit = () => {
    const lowerCaseSearch = search.toLowerCase();

    setVerifiedClients(
      originalVerifiedClients.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerCaseSearch) ||
          c.emailOne.toLowerCase().includes(lowerCaseSearch) ||
          c.emailTwo.toLowerCase().includes(lowerCaseSearch) ||
          c.ceoName.toLocaleLowerCase().includes(lowerCaseSearch) ||
          c.address.toLowerCase().includes(lowerCaseSearch),
      ),
    );

    setUnverifiedClients(
      originalUnverifiedClients.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerCaseSearch) ||
          c.emailOne.toLowerCase().includes(lowerCaseSearch) ||
          c.emailTwo.toLowerCase().includes(lowerCaseSearch) ||
          c.ceoName.toLocaleLowerCase().includes(lowerCaseSearch) ||
          c.address.toLowerCase().includes(lowerCaseSearch),
      ),
    );
  };

  useEffect(() => {
    setSearch('');
    setVerifiedClients(originalVerifiedClients);
    setUnverifiedClients(originalUnverifiedClients);
  }, [selectedType]);

  return (
    <>
      <NextSeo
        title={`${clientsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={clientsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/members/clients'}
        openGraph={{
          title: `${clientsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: clientsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/members/clients',
        }}
      />

      <PageHeader title={clientsPage.pageTitle} pages={[{ title: clientsPage.pageTitle, link: '/members/clients' }]} />

      <section className='container py-20 lg:py-[120px]'>
        <div className='mb-15 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center'>
          <Dropdown
            items={[
              { label: clientsPage.verified, value: 'verified' },
              { label: clientsPage.unverified, value: 'unverified' },
            ]}
            selectedValue={selectedType}
            onChangeHandler={setSelectedType}
          />
          <SearchInput
            placeholder={currentLocale === 'mn' ? 'Хайх' : 'Search'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={onSearchSubmit}
          />
        </div>

        {selectedType === 'verified' && (
          <VerifiedClients
            clients={verifiedClients}
            title={clientsPage.verifiedTitle}
            subTitle={clientsPage.verifiedSubTitle}
          />
        )}
        {selectedType === 'unverified' && (
          <UnverifiedClients clients={unverifiedClients} title={clientsPage.unverifiedTitle} />
        )}
      </section>
    </>
  );
};

export default ClientsPage;
