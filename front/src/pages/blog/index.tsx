import { getAllBlogCategories } from '@/api/services';
import { BlogCategoryFilter } from '@/components/features';
import { DefaultBlogCard, PageHeader, Pagination } from '@/components/global';
import { IBlogCategory } from '@/interfaces';
import { GetServerSideProps, NextPage } from 'next';

interface BlogPageProps {
  categories: IBlogCategory[];
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({ query }) => {
  const { locale = 'mn' } = query;

  const [categoriesRes] = await Promise.all([getAllBlogCategories({ locale: locale as string })]);

  return {
    props: {
      categories: categoriesRes.data,
    },
  };
};

const BlogPage: NextPage<BlogPageProps> = ({ categories }) => {
  return (
    <>
      <PageHeader title='Мэдээ мэдээлэл' pages={[{ title: 'Мэдээ мэдээлэл', link: '/blog' }]} />

      <div className='container py-[120px]'>
        <div className='grid grid-cols-4 gap-10'>
          <section className='col-span-3 space-y-15'>
            <div className='space-y-[30px]'>
              {Array.from(Array(10)).map((_, index) => {
                return <DefaultBlogCard key={index} />;
              })}
            </div>

            <Pagination />
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
