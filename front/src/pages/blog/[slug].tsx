import { BlogCategoryFilter } from '@/components/features';
import { GridBlogCard, PageHeader } from '@/components/global';
import { NextPage } from 'next';

const BlogDetailsPage: NextPage = () => {
  return (
    <>
      <PageHeader
        title='Мэдээний дэлгэрэнгүй'
        pages={[
          { title: 'Мэдээ', link: '/blog' },
          { title: 'Мэдээний дэлгэрэнгүй', link: '/blog/1' },
        ]}
      />

      <div className='container py-[120px]'>
        <div className='grid grid-cols-4 gap-10'>
          <section className='col-span-3'>
            <div className='mb-7 aspect-[1.9/1] w-full overflow-hidden rounded-xl bg-[#c4c4c4]'></div>

            <span className='mb-4 block text-date capitalize text-description'>April 21, 2023</span>

            <h1 className='mb-5 text-3xl font-bold capitalize leading-none text-dark'>
              Aliquam vel nibh sapien. Suspendisse placerat.
            </h1>

            <div className='blog-details'>
              <p>
                Sed nec sapien eu nibh porta fringilla. Aenean in lectus id tellus tempus rutrum vitae a elit. Nulla sit
                amet interdum ligula. Duis bibendum porttitor tempus. Morbi nisi nisl, sagittis in enim at this, tempus
                convallis magna. Nam malesuada risus non congue viverra. Nullam ultrices massa orci, in the eleifend
                diam fringilla a. Maecenas eu dignissim nulla. Morbi aliquet luctus massa fermentum pulvinar. Fusce vel
                dictum magna. Suspendisse purus erat, semper laoreet eros sed, vehicula aliquet quam. Maecens eget arcu
                sapien. Nam convallis sit amet lacus ut tristique. Ut posuere risus ipsum, sit amet efficitur eros
                varius eu. Cras placerat lacus purus, facilisis volutpat.
              </p>

              <h2>laboratory Couses History</h2>

              <p>
                Nullam ultrices massa orci, in the eleifend diam fringilla a. Maecenas eu dignissim nulla. Morbi aliquet
                luctus massa fermentum pulvinar. Fusce vel dictum magna. Suspendisse purus erat, semper laoreet eros
                sed, vehicula aliquet quam. Maecens eget arcu sapien. Nam convallis sit amet lacus ut tristique. Ut
                posuere risus ipsum, sit amet efficitur eros varius eu. Cras placerat lacus purus, facilisis volutpat.
              </p>

              <p>
                Porttitor tempus. Morbi nisi nisl, sagittis in enim at this, tempus convallis magna. Nam malesuada risus
                non congue viverra. Nullam ultrices massa orci, in the eleifend diam fringilla a. Maecenas eu dignissim
                nulla. Morbi aliquet luctus massa fermentum pulvinar. Fusce vel dictum magna. Suspendisse purus erat,
                semper laoreet eros sed, vehicula aliquet quam. Maecens eget arcu sapien. Nam convallis sit amet lacus
                ut tristique. Ut posuere risus ipsum, sit amet efficitur eros varius eu. Cras placerat lacus purus,
                facilisis volutpat.
              </p>

              <blockquote>
                <p>
                  Praesent eu efficitur nulla. Pellentesque commodo ut lorem vel accumsan. Vivamus sit amet metus
                  convallis, suscipit elit ac, tincidunt enim. Vivamus sagittis eleifend maximus. Nunc turpis sem,
                  malesuada a faucibus sed, cursus quis est.
                </p>
              </blockquote>
            </div>

            <div className='w-full py-[120px]'>
              <h6 className='mb-14 text-sectionTitle font-bold text-dark'>Төстэй мэдээнүүд</h6>
              <div className='grid grid-cols-3 gap-6'>
                <GridBlogCard />
                <GridBlogCard />
                <GridBlogCard />
              </div>
            </div>
          </section>

          <aside className='sticky top-44 col-span-1 h-max space-y-[30px]'>
            <BlogCategoryFilter />
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
