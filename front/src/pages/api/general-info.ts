import { getGeneralInfo } from '@/api/services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { locale = 'mn' } = req.query;

  const response = await getGeneralInfo({ locale: locale as string });

  res.status(200).json({ data: response.data });
}
