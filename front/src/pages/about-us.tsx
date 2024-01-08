import { getAboutUsPage, getStatistics } from '@/api/services';
import { PageHeader } from '@/components/global';
import { Statistics } from '@/components/sections';
import { IAboutUsPage, IStatistic } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';

interface AboutUsPageProps {
  statistics: IStatistic[];
  pageInfo: IAboutUsPage;
}

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async ({ locale }) => {
  const [statisticsRes, pageInfoRes] = await Promise.all([
    getStatistics({ locale: locale as string }),
    getAboutUsPage({ locale: locale as string }),
  ]);

  return {
    props: {
      statistics: statisticsRes.data,
      pageInfo: pageInfoRes.data,
    },
  };
};

const AboutUsPage: NextPage<AboutUsPageProps> = ({ statistics, pageInfo }) => {
  return (
    <>
      <PageHeader title={pageInfo.pageTitle} pages={[{ title: pageInfo.pageTitle, link: '/about-us' }]} />

      <section className='container py-[120px]'>
        <div className='mb-25 text-center'>
          <h2 className='mb-3 text-3xl capitalize leading-none text-dark'>
            МОНГОЛ УЛСЫН ТАТВАРЫН МЭРГЭШСЭН ЗӨВЛӨХИЙН НИЙГЭМЛЭГ
          </h2>
          <p className='text-base text-description'>Мэргэшсэн багаар, мэргэжлийн үйлчилгээг</p>
        </div>

        <Statistics statistics={statistics} />

        <div className='mb-5 aspect-[2.6/1] w-full overflow-hidden rounded-xl bg-[#c4c4c4]'></div>

        <p className='mb-4 text-base leading-normal text-description'>
          Татварын мэргэшсэн зөвлөхийн нийгэмлэг нь Монгол Японы татварын бүртгэлийн судалгааны “Кайкэй” нийгэмлэгийн
          үндсэн дээр 2004 оны арванхоёрдугаар сарын 23-нд “Татварын итгэмжлэгдсэн нягтлан бодогч зөвлөхүүдийн ТИНЗ
          нийгэмлэг” нэртэйгээр Сангийн яам, ТЕГ, Аудитын болон бизнесийн байгууллагын төлөөлөл, эрдэмтэн судлаачдын
          санаачлагаар үүсгэн байгуулагдсан. 2012 оны арванхоёрдугаар сарын 27–нд “Татварын мэргэшсэн зөвлөх
          үйлчилгээний тухай хууль” батлагдаснаар эрх зүйн орчин баталгаажиж, хуулийн хүрээнд нэрээ Татварын мэргэшсэн
          зөвлөхийн нийгэмлэг болгон өөрчилсөн.
        </p>

        <p className='mb-4 text-base leading-normal text-description'>
          2022 оны байдлаар нийт 1587 гаруй гишүүнтэй, татварын мэргэшсэн зөвлөх үйлчилгээ эрхлэх тусгай зөвшөөрөлтэй 38
          компанитай үйл ажиллагаа явуулж байна.
        </p>

        <div className='grid grid-cols-3 gap-10 pt-10'>
          {Array.from(Array(3)).map((_, index) => {
            return (
              <div
                key={index}
                className='group rounded-xl border border-gray px-[30px] py-[50px] shadow-card hover:bg-primary'
              >
                <h6 className='mb-5 text-xl font-semibold uppercase text-dark group-hover:text-white'>Алсын хараа:</h6>
                <p className='text-base leading-[30px] text-description group-hover:text-white'>
                  Олон улсын стандартад нийцсэн татварын тогтолцооны хөгжилд манлайлагч, мэргэжлийн байгууллага байх
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
