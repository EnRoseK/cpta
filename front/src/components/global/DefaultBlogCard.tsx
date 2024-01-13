import React, { FC } from 'react';
import { Button } from '.';
import Link from 'next/link';
import { IBlog } from '@/interfaces';
import { convertAttachmentUrl, convertDateToString } from '@/utils';
import Image from 'next/image';
import { useLocale } from '@/hooks';

interface DefaultBlogCardProps {
  blog: IBlog;
}

export const DefaultBlogCard: FC<DefaultBlogCardProps> = ({ blog }) => {
  const { currentLocale } = useLocale();

  const moreUrl = `/blog/${blog.slug}`;

  return (
    <div className='w-full overflow-hidden rounded-xl shadow-card'>
      <Link
        href={moreUrl}
        className='group block aspect-[1.3/1] w-full overflow-hidden bg-[#d9d9d9] min-[400px]:aspect-[1.6/1] sm:aspect-[2.16/1]'
      >
        {blog.thumbnail.mime.includes('image') && (
          <Image
            src={convertAttachmentUrl(blog.thumbnail.url)}
            alt={blog.thumbnail.alternativeText || blog.thumbnail.name}
            className='h-full w-full object-cover group-hover:scale-105'
            width={blog.thumbnail.width}
            height={blog.thumbnail.height}
          />
        )}
        {blog.thumbnail.mime.includes('video') && (
          <video className='h-full w-full object-cover' controls>
            <source src={convertAttachmentUrl(blog.thumbnail.url)} type='video/mp4' />
            Таны вэб хөтөч видео тоглуулах боломжгүй байна.
          </video>
        )}
      </Link>

      <div className='bg-white p-[30px]'>
        <span className='mb-4 block text-date text-description'>{convertDateToString(new Date(blog.createdAt))}</span>
        <Link
          href={moreUrl}
          className='mb-5 block text-2xl font-bold text-dark hover:text-primary min-[400px]:text-3xl min-[400px]:leading-none'
        >
          {blog.title}
        </Link>
        <p className='mb-6 text-sm text-description min-[400px]:text-base min-[400px]:leading-[30px]'>
          {blog.description}
        </p>
        <Button asLink href={moreUrl} variant='gray'>
          {currentLocale === 'mn' ? 'Дэлгэрэнгүй' : 'Read More'}
        </Button>
      </div>
    </div>
  );
};
