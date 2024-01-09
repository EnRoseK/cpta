import { IClient } from '@/interfaces';
import React, { FC } from 'react';

interface VerifiedClientsProps {
  clients: IClient[];
}

export const VerifiedClients: FC<VerifiedClientsProps> = ({ clients }) => {
  return (
    <>
      <h3 className='mb-10 text-center text-xl text-dark'>
        Татварын мэргэшсэн зөвлөхийн үйлчилгээ эрхлэх тусгай зөвшөөрөл нь хүчинтэй, үйл ажиллагаа эрхэлж буй хуулийн
        этгээдүүдийн жагсаалт
      </h3>

      <span className='mb-5 block text-end text-base italic text-description'>
        /2023 оны 9 дүгээр сарын 13-ны өдрийн байдлаар/
      </span>

      <div className='relative overflow-x-auto sm:rounded-lg'>
        <table className='w-full text-left text-base text-dark'>
          <thead className='dark:bg-gray-700 bg-gray text-sm uppercase text-dark'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                #
              </th>
              <th scope='col' className='px-6 py-3'>
                Байгууллагын нэр
              </th>
              <th scope='col' className='px-6 py-3'>
                Тусгай зөвшөөрлийн хүчинтэй хугацаа
              </th>
              <th scope='col' className='px-6 py-3'>
                Захирлын нэр
              </th>
              <th scope='col' className='px-6 py-3'>
                Утасны дугаар
              </th>
              <th scope='col' className='px-6 py-3'>
                Цахим хаяг
              </th>
              <th scope='col' className='px-6 py-3'>
                Байгууллагын хаяг
              </th>
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
