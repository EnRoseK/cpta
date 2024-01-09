/* eslint-disable react-hooks/exhaustive-deps */
import { getClients } from '@/api/services';
import { Dropdown, PageHeader, SearchInput } from '@/components/global';
import { UnverifiedClients, VerifiedClients } from '@/components/sections';
import { IClient } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';

interface ClientsPageProps {
  clients: IClient[];
}

export const getStaticProps: GetStaticProps<ClientsPageProps> = async ({ locale }) => {
  const res = await getClients({ locale: locale as string });

  return {
    props: {
      clients: res.data,
    },
  };
};

const ClientsPage: NextPage<ClientsPageProps> = ({ clients }) => {
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
      <PageHeader
        title='Татварын итгэмжлэгдсэн хуулийн этгээд'
        pages={[{ title: 'Татварын итгэмжлэгдсэн хуулийн этгээд', link: '/members/clients' }]}
      />

      <section className='container py-[120px]'>
        <div className='mb-15 flex items-center justify-between'>
          <Dropdown
            items={[
              { label: 'Татварын итгэмжлэгдсэн хуулийн этгээд', value: 'verified' },
              { label: 'Хүчингүй хуулийн этгээд', value: 'unverified' },
            ]}
            selectedValue={selectedType}
            onChangeHandler={setSelectedType}
          />
          <SearchInput
            placeholder='Хайх'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={onSearchSubmit}
          />
        </div>

        {selectedType === 'verified' && <VerifiedClients clients={verifiedClients} />}
        {selectedType === 'unverified' && <UnverifiedClients clients={unverifiedClients} />}
      </section>
    </>
  );
};

export default ClientsPage;
