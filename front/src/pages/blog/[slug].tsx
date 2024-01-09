import { getAllBlogCategories, getBlogBySlug, getBlogSlugs, getPaginatedBlogs } from '@/api/services';
import { BlogCategoryFilter } from '@/components/features';
import { GridBlogCard } from '@/components/global';
import { useLocale } from '@/hooks';
import { IBlog, IBlogCategory } from '@/interfaces';
import { convertAttachmentUrl, parseMarkDown } from '@/utils';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
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

  return (
    <>
      <div className='container py-[120px]'>
        <div className='grid grid-cols-4 gap-10'>
          <section className='col-span-3'>
            <div className='mb-7 aspect-[1.9/1] w-full overflow-hidden rounded-xl bg-[#c4c4c4]'>
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

            <span className='mb-4 block text-date capitalize text-description'>April 21, 2023</span>

            <h1 className='mb-5 text-3xl font-bold normal-case leading-none text-dark'>{blog.title}</h1>

            <div className='blog-details' dangerouslySetInnerHTML={{ __html: content }} />

            {relatedBlogs.length > 0 && (
              <div className='w-full py-[120px]'>
                <h6 className='mb-14 text-sectionTitle font-bold text-dark'>Төстэй мэдээнүүд</h6>
                <div className='grid grid-cols-2 gap-6'>
                  {relatedBlogs.map((blog) => {
                    return <GridBlogCard key={blog.id} blog={blog} />;
                  })}
                </div>
              </div>
            )}
          </section>

          <aside className='sticky top-44 col-span-1 h-max space-y-[30px]'>
            <BlogCategoryFilter categories={categories} isDetailsPage />
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
