import { useLocale } from '@/hooks';
import { IClient } from '@/interfaces';
import React, { FC } from 'react';

const tableHeaders = [
  { mn: 'Хуулийн этгээдийн нэрс', en: 'Name' },
  { mn: 'Тусгай зөвшөөрөл дуусах хугацаа', en: 'License expiration date' },
];

interface UnverifiedClientsProps {
  clients: IClient[];
  title?: string;
}

export const UnverifiedClients: FC<UnverifiedClientsProps> = ({ clients, title }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      {title && <h3 className='mb-10 text-center text-xl text-dark'>{title}</h3>}

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
            {clients.map((client, index) => {
              return (
                <tr
                  key={client.id}
                  className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'
                >
                  <td className='px-6 py-4'>{index + 1}</td>
                  <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-dark '>
                    {client.name}
                  </th>
                  <td className='px-6 py-4'>{client.expirationDate}</td>
                </tr>
              );
            })}

            {clients.length === 0 && (
              <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                <th colSpan={3} scope='row' className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'>
                  Илэрц олдсонгүй
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
