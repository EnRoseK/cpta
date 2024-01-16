import React, { FC } from 'react';

const tableHeaders = [
  {
    mn: 'Бүртгэлийн дугаар',
  },
  {
    mn: 'Харъяалал',
  },
  {
    mn: 'Татварын бүртгэл',
  },
  {
    mn: 'Татварын онол - Мэргэжлийн ёс зүй',
  },
  {
    mn: 'Хууль эрх зүй',
  },
  {
    mn: 'СТОУС-ын Хэрэглээ',
  },
];

export const GrantRightsExam: FC = () => {
  return (
    <>
      <div className='flex items-center justify-end'>
        <span className='mb-10 block max-w-[700px] text-end text-base italic text-description'>
          Татварын мэргэшсэн зөвлөхөд эрх олгох, сунгах шалгалт авах комиссын бүрэлдэхүүний 2023 оны 12 сарын 22 -ны
          өдрийн 009 тоот тогтоолын хоёрдугаар хавсралт{' '}
        </span>
      </div>

      <h3 className='mb-5 text-center text-xl text-dark'>
        Татварын мэргэшсэн зөвлөхийн эрх олгох шалгалтад бүртгүүлсэн нягтлан бодогчдын дүнгийн жагсаалт
      </h3>

      <h2 className='mb-10 text-center text-2xl text-dark'>/2023.12.22/</h2>

      <div className='relative overflow-x-auto sm:rounded-lg'>
        <table className='w-full text-left text-base text-dark'>
          <thead className='dark:bg-gray-700 bg-gray text-sm uppercase text-dark'>
            <tr>
              {tableHeaders.map((header, index) => {
                return (
                  <th key={index} scope='col' className='px-6 py-3'>
                    {header.mn}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* {clients.map((client, index) => {
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
            )} */}
          </tbody>
        </table>
      </div>
    </>
  );
};
