import React, { FC } from 'react';

export const Statistics: FC = () => {
  return (
    <section className='mb-25 border-t-dark/[0.07] container border-t pt-14'>
      <div className='grid grid-cols-4 gap-40'>
        {Array.from(Array(4)).map((_, index) => {
          return (
            <div key={index} className='text-center'>
              <h5 className='text-primary mb-5 text-5xl font-semibold leading-[44px]'> 1747</h5>
              <span className='text-description text-small block capitalize'>Татварын мэргэшсэн зөвлөх</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
