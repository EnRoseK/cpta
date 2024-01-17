import { getAllBlogCategories, getBlogBySlug, getBlogSlugs } from '@/api/services';
import { GridBlogCard } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IBlog, IBlogCategory } from '@/interfaces';
import { convertAttachmentUrl, convertDateToString, parseMarkDown } from '@/utils';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface BlogDetailsPageProps {
  blog: IBlog;
  categories: IBlogCategory[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getBlogSlugs({ locale: 'all' });
  const paths = res.data.map((blog) => ({ params: { slug: blog.slug }, locale: blog.locale }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<BlogDetailsPageProps> = async ({ params, locale }) => {
  try {
    const [blogRes, categoriesRes] = await Promise.all([
      getBlogBySlug(params?.slug as string, locale as string),
      getAllBlogCategories({ locale: locale as string }),
    ]);

    if (blogRes.data.length === 0) {
      throw new Error();
    }

    return {
      props: {
        blog: blogRes.data[0],
        categories: categoriesRes.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const BlogDetailsPage: NextPage<BlogDetailsPageProps> = ({ blog, categories }) => {
  const { currentLocale } = useLocale();
  const content = parseMarkDown(blog.content);
  const [relatedBlogs, setRelatedBlogs] = useState<IBlog[]>([]);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const res = await axios
          .get<{ data: IBlog[] }>(`/api/related-blogs?locale=${currentLocale}&categorySlug=${blog.category.slug}`)
          .then((res) => res.data);

        setRelatedBlogs(res.data.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.log(error);
      }
    };

    fetchRelatedBlogs();
  }, [blog.category, currentLocale, blog.id]);

  useEffect(() => {
    ref.current?.load();
  }, [blog.id]);

  useEffect(() => {
    const links = document.querySelectorAll('.blog-details a');
    for (let i = 0; i < links.length; i++) {
      if ((links[i] as HTMLAnchorElement).hostname != window.location.hostname) {
        (links[i] as HTMLAnchorElement).target = '_blank';
      }
    }
  }, []);

  return (
    <>
      <NextSeo
        title={`${blog.title} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={blog.description}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/${
          currentLocale === 'mn' ? `blog/${blog.slug}` : `en/blog/${blog.slug}`
        }`}
        openGraph={{
          title: `${blog.title} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: blog.description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${
            currentLocale === 'mn' ? `blog/${blog.slug}` : `en/blog/${blog.slug}`
          }`,
          images: [],
        }}
      />

      <div className='container py-20 lg:py-[120px]'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-4'>
          <section className='col-span-1 lg:col-span-4'>
            <div className='mb-7 aspect-square w-full overflow-hidden rounded-xl bg-[#c4c4c4] min-[400px]:aspect-[1.3/1] sm:aspect-[1.9/1]'>
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
                <video ref={ref} className='h-full w-full object-cover' controls>
                  <source src={convertAttachmentUrl(blog.thumbnail.url)} type='video/mp4' />
                  Таны вэб хөтөч видео тоглуулах боломжгүй байна.
                </video>
              )}
            </div>

            <span className='mb-4 block text-date text-description'>
              {convertDateToString(new Date(blog.date || blog.createdAt))}
            </span>

            <h1 className='mb-5 text-2xl font-bold normal-case text-dark min-[400px]:text-3xl min-[400px]:leading-none'>
              {blog.title}
            </h1>

            <div className='blog-details' dangerouslySetInnerHTML={{ __html: content }} />

            {relatedBlogs.length > 0 && (
              <div className='w-full py-20 lg:py-[120px]'>
                <h6 className='mb-14 text-sectionTitle font-bold text-dark'>Төстэй мэдээнүүд</h6>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  {relatedBlogs.map((blog) => {
                    return <GridBlogCard key={blog.id} blog={blog} />;
                  })}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
