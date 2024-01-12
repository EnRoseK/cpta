import { getAllBlogCategories, getBlogPage, getPaginatedBlogs } from '@/api/services';
import { BlogCategoryFilter } from '@/components/features';
import { DefaultBlogCard, PageHeader, Pagination } from '@/components/global';
import { siteName } from '@/constants';
import { useLocale } from '@/hooks';
import { IBlog, IBlogCategory, IBlogPage, IPagination } from '@/interfaces';
import { convertAttachmentUrl } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

interface BlogPageProps {
  categories: IBlogCategory[];
  blogs: IBlog[];
  pagination: IPagination;
  blogPage: IBlogPage;
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({ locale = 'mn', query }) => {
  const { page = '1', category } = query;

  const [categoriesRes, blogsRes, blogPageRes] = await Promise.all([
    getAllBlogCategories({ locale }),
    getPaginatedBlogs({
      locale,
      page: Number(page),
      filters: { category: { slug: { $eq: category as string } } },
    }),
    getBlogPage({ locale: locale as string }),
  ]);

  return {
    props: {
      categories: categoriesRes.data,
      blogs: blogsRes.data,
      pagination: blogsRes.meta.pagination,
      blogPage: blogPageRes.data,
    },
  };
};

const BlogPage: NextPage<BlogPageProps> = ({ categories, blogs, pagination, blogPage }) => {
  const { currentLocale } = useLocale();

  return (
    <>
      <NextSeo
        title={`${blogPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`}
        description={blogPage.pageDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + '/blog'}
        openGraph={{
          title: `${blogPage.pageTitle} | ${siteName[currentLocale! as 'mn' | 'en']}`,
          description: blogPage.pageDescription,
          url: process.env.NEXT_PUBLIC_SITE_URL + '/blog',
          images: blogs.map((blog) => ({
            url: convertAttachmentUrl(blog.thumbnail.url),
            width: blog.thumbnail.width,
            height: blog.thumbnail.height,
          })),
        }}
      />

      <PageHeader title={blogPage.pageTitle} pages={[{ title: blogPage.pageTitle, link: '/blog' }]} />

      <div className='container py-[120px]'>
        <div className='grid grid-cols-4 gap-10'>
          <section className='col-span-3 space-y-15'>
            <div className='space-y-[30px]'>
              {blogs.map((blog) => {
                return <DefaultBlogCard key={blog.id} blog={blog} />;
              })}
            </div>

            <Pagination pagination={pagination} />
          </section>

          <aside className='sticky top-44 col-span-1 h-max space-y-[30px]'>
            <BlogCategoryFilter categories={categories} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
