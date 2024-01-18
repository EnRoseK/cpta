import { getTopMenu } from '@/api/services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { locale = 'mn' } = req.query;

  const response = await getTopMenu({ locale: locale as string });

  res.status(200).json({ data: response.data });
}
