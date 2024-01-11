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
    <section className='py-[120px]'>
      <div className='container'>
        <div className='mb-14 flex items-center justify-between'>
          <h3 className='max-w-[400px] text-sectionTitle font-bold capitalize text-dark'>{sectionInfo.sectionTitle}</h3>

          <SeeMoreLink href='/members/clients' />
        </div>

        <div className='grid grid-cols-6 gap-6'>
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
