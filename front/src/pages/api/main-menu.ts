import { getAllMainMenus } from '@/api/services/main-menu';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { locale = 'mn' } = req.query;

  const response = await getAllMainMenus({ locale: locale as string });

  res.status(200).json({ data: response.data });
}
