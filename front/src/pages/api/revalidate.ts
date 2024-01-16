import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const REVALIDATE_MAP: { [key: string]: string[] } = {
  'about-us-page': ['/about-us'],
  'bank-accounts-page': ['/bank-accounts'],
  blog: ['/', '/blog/[slug]'],
  client: ['/members/clients'],
  'clients-page': ['/members/clients'],
  director: ['/directors'],
  'directors-page': ['/directors'],
  'faq-page': ['/faqs'],
  greeting: ['/greetings'],
  'greetings-page': ['/greetings'],
  'home-page': ['/'],
  'honorary-member': ['/members/honorary'],
  'honorary-member-page': ['/members/honorary'],
  'logo-page': ['/logo'],
  'office-page': ['/office'],
  'office-worker': ['/office'],
  'static-page': ['/[slug]'],
  statistic: ['/', '/about-us'],
  supervisor: ['/supervisors'],
  'supervisors-page': ['/supervisors'],
  'tax-analyst': ['/tax-analysts'],
  'tax-analysts-page': ['/tax-analysts'],
  'tax-specialists-page': ['/tax-specialists'],
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const { model, entry } = req.body;

    let paths = REVALIDATE_MAP[model];

    if (!paths) {
      return res.status(400).json({ message: 'Wrong data model' });
    }

    if (entry.locale === 'en') {
      paths = paths.map((path) => '/en' + path);
    }

    for (const path of paths) {
      if (entry.slug && path.includes('[slug]')) {
        await res.revalidate(path.replaceAll('[slug]', entry.slug));
      } else {
        await res.revalidate(path);
      }
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
};

export default handler;
