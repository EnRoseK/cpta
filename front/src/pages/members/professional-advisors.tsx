import { Button, Input, PageHeader } from '@/components/global';
import { NextPage } from 'next';
import React from 'react';

const ProfessionalAdvisorsPage: NextPage = () => {
  return (
    <>
      <PageHeader
        title='Монгол Улсын Татварын Мэргэшсэн зөвлөх'
        pages={[{ title: 'Монгол Улсын Татварын Мэргэшсэн зөвлөх', link: '/members/professional-advisors' }]}
      />

      <section className='container py-[120px]'>
        <div className='grid grid-cols-5 gap-15'>
          <aside className='sticky top-44 col-span-1 h-max'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className='space-y-5'
            >
              <h6 className='text-xl font-bold leading-normal text-dark'>Хайх</h6>
              <Input id='lastName' name='lastName' placeholder='Овог' />
              <Input id='firstName' name='firstName' placeholder='Нэр' />
              <Button type='submit' size='small'>
                Хайх
              </Button>
            </form>
          </aside>

          <div className='col-span-4'>
            <h3 className='mb-10 text-center text-xl text-dark'>Монгол Улсын Татварын Мэргэшсэн Зөвлөхийн жагсаалт</h3>

            <span className='mb-5 block text-end text-base italic text-description'>2023.07.05-ны байдлаар</span>

            <div className='relative overflow-x-auto sm:rounded-lg'>
              <table className='w-full text-left text-base text-dark'>
                <thead className='dark:bg-gray-700 bg-gray text-sm uppercase text-dark'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      #
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      ТМЗ-ийн гэрчилгээний дугаар
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Овог
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Нэр
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Эрх авсан огноо
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Эрх дуусах хугацаа
                    </th>
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
                  Илэрц олдсонгүй
                </th>
              </tr>
            )} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfessionalAdvisorsPage;
