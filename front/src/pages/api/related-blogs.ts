import { getPaginatedBlogs } from '@/api/services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { locale = 'mn', categorySlug = '' } = req.query;

  const response = await getPaginatedBlogs({
    locale: locale as string,
    page: 1,
    pageSize: 3,
    filters: { category: { slug: { $eq: categorySlug } } },
  });

  res.status(200).json({ data: response.data });
}
