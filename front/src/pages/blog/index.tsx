import { BlogCategoryFilter } from '@/components/features';
import { DefaultBlogCard, PageHeader, Pagination } from '@/components/global';
import { NextPage } from 'next';

const BlogPage: NextPage = () => {
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
            <BlogCategoryFilter />
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
