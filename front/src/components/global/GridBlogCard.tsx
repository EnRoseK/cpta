import React, { FC } from 'react';
import { Button } from '.';
import Link from 'next/link';
import { IBlog } from '@/interfaces';
import { convertAttachmentUrl, convertDateToString } from '@/utils';
import Image from 'next/image';

interface GridBlogCardProps {
  blog: IBlog;
}

export const GridBlogCard: FC<GridBlogCardProps> = ({ blog }) => {
  const moreUrl = `/blog/${blog.slug}`;

  return (
    <div className='flex h-full w-full flex-col overflow-hidden rounded-xl shadow-card'>
      <Link href={moreUrl} className='group block aspect-[1.5/1] w-full shrink-0 overflow-hidden bg-[#c4c4c4]'>
        {blog.thumbnail.mime.includes('image') && (
          <Image
            src={convertAttachmentUrl(blog.thumbnail.url)}
            alt={blog.thumbnail.alternativeText || blog.thumbnail.name}
            width={blog.thumbnail.width}
            height={blog.thumbnail.height}
            className='h-full w-full object-cover group-hover:scale-105'
          />
        )}
        {blog.thumbnail.mime.includes('video') && (
          <video className='h-full w-full object-cover' controls>
            <source src={convertAttachmentUrl(blog.thumbnail.url)} type='video/mp4' />
            Таны вэб хөтөч видео тоглуулах боломжгүй байна.
          </video>
        )}
      </Link>

      <div className='flex flex-1 flex-col justify-between bg-white p-7'>
        <span className='mb-3 block text-date normal-case text-description'>
          {convertDateToString(new Date(blog.createdAt))}
        </span>

        <Link
          href={moreUrl}
          className='mb-2 block text-xl font-bold normal-case leading-normal text-dark hover:text-primary'
        >
          {blog.title}
        </Link>

        <p className='mb-7 text-base leading-[30px] text-description'>{blog.description}</p>

        <Button asLink href={moreUrl} variant='gray'>
          Дэлгэрэнгүй
        </Button>
      </div>
    </div>
  );
};
