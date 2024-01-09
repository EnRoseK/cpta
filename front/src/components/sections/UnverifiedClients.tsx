import { IClient } from '@/interfaces';
import React, { FC } from 'react';

interface UnverifiedClientsProps {
  clients: IClient[];
}

export const UnverifiedClients: FC<UnverifiedClientsProps> = ({ clients }) => {
  return (
    <>
      <h3 className='mb-10 text-center text-xl text-dark'>
        Тусгай зөвшөөрөл нь хүчингүй болсон хуулийн этгээдийн жагсаалт
      </h3>

      <div className='relative overflow-x-auto sm:rounded-lg'>
        <table className='w-full text-left text-base text-dark'>
          <thead className='dark:bg-gray-700 bg-gray text-sm uppercase text-dark'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                #
              </th>
              <th scope='col' className='px-6 py-3'>
                Хуулийн этгээдийн нэрс
              </th>
              <th scope='col' className='px-6 py-3'>
                Тусгай зөвшөөрөл дуусах хугацаа
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
