import { getTaxSpecialistsPage } from '@/api/services';
import { Button, Input, PageHeader } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { ITaxSepcialistsPage } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

const tableHeaders = [
  { mn: 'ТМЗ-ийн гэрчилгээний дугаар', en: 'License number' },
  { mn: 'Овог', en: 'Lastname' },
  { mn: 'Нэр', en: 'Firstname' },
  { mn: 'Эрх авсан огноо', en: 'Date of Entitlement' },
  { mn: 'Эрх дуусах хугацаа', en: 'Expiry date' },
];

interface TaxSpecialistsPageProps {
  taxSpecialistsPage: ITaxSepcialistsPage;
}

export const getStaticProps: GetStaticProps<TaxSpecialistsPageProps> = async ({ locale }) => {
  const res = await getTaxSpecialistsPage({ locale: locale as string });

  return {
    props: {
      taxSpecialistsPage: res.data,
    },
  };
};

const TaxSpecialistsPage: NextPage<TaxSpecialistsPageProps> = ({ taxSpecialistsPage }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${taxSpecialistsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={taxSpecialistsPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/members/tax-specialists'}
        openGraph={{
          title: `${taxSpecialistsPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: taxSpecialistsPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/members/tax-specialists',
        }}
      />

      <PageHeader
        title={taxSpecialistsPage.pageTitle}
        pages={[{ title: taxSpecialistsPage.pageTitle, link: '/members/tax-specialists' }]}
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
              <h6 className='text-xl font-bold leading-normal text-dark'>
                {currentLocale === 'mn' ? 'Хайх' : 'Search'}
              </h6>
              <Input id='lastName' name='lastName' placeholder={currentLocale === 'mn' ? 'Овог' : 'Lastname'} />
              <Input id='firstName' name='firstName' placeholder={currentLocale === 'mn' ? 'Нэр' : 'Firstname'} />
              <Button type='submit' size='small'>
                {currentLocale === 'mn' ? 'Хайх' : 'Search'}
              </Button>
            </form>
          </aside>

          <div className='col-span-4'>
            {taxSpecialistsPage.smallTitle && (
              <h3 className='mb-10 text-center text-xl text-dark'>{taxSpecialistsPage.smallTitle}</h3>
            )}

            {taxSpecialistsPage.smallSubTitle && (
              <span className='mb-5 block text-end text-base italic text-description'>
                {taxSpecialistsPage.smallSubTitle}
              </span>
            )}

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

export default TaxSpecialistsPage;
