import { getAllBlogCategories, getPaginatedBlogs } from '@/api/services';
import { BlogCategoryFilter } from '@/components/features';
import { DefaultBlogCard, PageHeader, Pagination } from '@/components/global';
import { IBlog, IBlogCategory, IPagination } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';

interface BlogPageProps {
  categories: IBlogCategory[];
  blogs: IBlog[];
  pagination: IPagination;
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({ locale = 'mn', query }) => {
  const { page = '1', category } = query;

  const [categoriesRes, blogsRes] = await Promise.all([
    getAllBlogCategories({ locale }),
    getPaginatedBlogs({
      locale,
      page: Number(page),
      filters: { category: { slug: { $eq: category as string } } },
    }),
  ]);

  return {
    props: {
      categories: categoriesRes.data,
      blogs: blogsRes.data,
      pagination: blogsRes.meta.pagination,
    },
  };
};

const BlogPage: NextPage<BlogPageProps> = ({ categories, blogs, pagination }) => {
  return (
    <>
      <PageHeader title='Мэдээ мэдээлэл' pages={[{ title: 'Мэдээ мэдээлэл', link: '/blog' }]} />

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
