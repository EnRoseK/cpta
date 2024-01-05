import React, { FC, useState } from 'react';
import { SeeMoreLink } from '../global';
import Link from 'next/link';

export const Clients: FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <section className='py-[120px]'>
      <div className='container'>
        <div className='mb-14 flex items-center justify-between'>
          <h3 className='text-dark text-sectionTitle max-w-[400px] font-bold capitalize'>
            Татварын итгэмжлэгдсэн хуулийн этгээд
          </h3>

          <SeeMoreLink
            asButton
            onClick={() => setShowAll((prev) => !prev)}
            text={showAll ? 'Хураангуй' : 'Дэлгэрэнгүй'}
          />
        </div>

        <div className='grid grid-cols-6 gap-6'>
          {Array.from(Array(showAll ? 24 : 12)).map((_, index) => {
            return (
              <Link
                target='_blank'
                href={'#'}
                key={index}
                className='border-dark/10 hover:border-secondary flex aspect-square w-full items-center justify-center rounded-xl border p-8'
              >
                <div className='h-full w-full'></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
