import React, { FC } from 'react';
import { SeeMoreLink } from '../global';
import { IClient, ISection } from '@/interfaces';
import Image from 'next/image';
import { convertAttachmentUrl } from '@/utils';

interface ClientsProps {
  clients: IClient[];
  sectionInfo: ISection;
}

export const Clients: FC<ClientsProps> = ({ clients, sectionInfo }) => {
  if (clients.length === 0) {
    return <></>;
  }

  return (
    <section className='py-20 lg:py-[120px]'>
      <div className='container'>
        <div className='mb-10 flex flex-col items-center justify-between gap-4 min-[500px]:mb-14 min-[500px]:flex-row'>
          <h3 className='max-w-[400px] text-center text-sectionTitle font-bold capitalize text-dark min-[500px]:text-start'>
            {sectionInfo.sectionTitle}
          </h3>

          <SeeMoreLink href='/members/clients' />
        </div>

        <div className='grid gap-6 min-[370px]:grid-cols-2 min-[500px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {clients.map((client) => {
            return (
              <div
                key={client.id}
                className='flex aspect-square w-full items-center justify-center rounded-xl border border-dark/10 p-8 hover:border-secondary'
              >
                <div className='h-full w-full'>
                  <Image
                    src={convertAttachmentUrl(client.logo.url)}
                    alt={client.logo.alternativeText || client.name}
                    width={client.logo.width}
                    height={client.logo.height}
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
