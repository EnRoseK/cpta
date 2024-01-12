import { useLocale } from '@/hooks';
import { IClient } from '@/interfaces';
import React, { FC } from 'react';

const tableHeaders = [
  { mn: 'Байгууллагын нэр', en: 'Organization name' },
  { mn: 'Тусгай зөвшөөрлийн хүчинтэй хугацаа', en: 'License expiration date' },
  { mn: 'Захирлын нэр', en: "Director's name" },
  { mn: 'Утасны дугаар', en: 'Phone number' },
  { mn: 'Цахим хаяг', en: 'Email address' },
  { mn: 'Байгууллагын хаяг', en: 'Organization address' },
];

interface VerifiedClientsProps {
  clients: IClient[];
  title?: string;
  subTitle?: string;
}

export const VerifiedClients: FC<VerifiedClientsProps> = ({ clients, title, subTitle }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      {title && <h3 className='mb-10 text-center text-xl text-dark'>{title}</h3>}

      {subTitle && <span className='mb-5 block text-end text-base italic text-description'>{subTitle}</span>}

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
                  <td className='px-6 py-4'>{client.ceoName}</td>
                  <td className='px-6 py-4'>
                    {client.phoneOne}
                    {client.phoneTwo && <>, {client.phoneTwo}</>}
                  </td>
                  <td className='px-6 py-4'>
                    {client.emailOne}
                    {client.emailTwo && <>, {client.emailTwo}</>}
                  </td>
                  <td className='px-6 py-4'>{client.address}</td>
                </tr>
              );
            })}

            {clients.length === 0 && (
              <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                <th colSpan={7} scope='row' className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'>
                  {currentLocale === 'mn' ? 'Илэрц олдсонгүй' : 'No record found'}
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
