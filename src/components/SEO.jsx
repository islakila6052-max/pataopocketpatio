import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://pataopocketpatio.vercel.app';
const OG_IMAGE = `${SITE_URL}/og-image.webp`;

export default function SEO({
  title = 'Patao Pocket Patio & PS — Botanical Garden & Plant Shop',
  description = 'Discover tropical plants and enjoy a peaceful garden visit at Patao Pocket Patio & PS.',
  path = '/',
}) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Patao Pocket Patio & PS" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:site_name" content="Patao Pocket Patio & PS" />
      <meta property="og:locale" content="en_PH" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
