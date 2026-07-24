import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://pataopocketpatio.vercel.app';
const OG_IMAGE =
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  name: 'Patao Pocket Patio & Plant Sanctuary',
  description:
    'A peaceful eco-friendly nature destination with botanical gardens, resort pools, and unforgettable moments surrounded by nature.',
  url: SITE_URL,
  image: OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Patao Pocket',
    addressRegion: 'Nature Valley',
    addressCountry: 'PH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '11.223741647405047',
    longitude: '123.69582244191017',
  },
  telephone: '+63 912 345 6789',
  email: 'hello@pataosanctuary.com',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '08:00',
    closes: '20:00',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Botanical Garden', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Garden Café', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Resort Rooms', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Photography Spot', value: true },
  ],
};

/**
 * SEO component with all meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
 */
export default function SEO() {
  return (
    <Helmet>
      {/* Primary Meta */}
      <title>Patao Pocket Patio & Plant Sanctuary — Nature Resort & Botanical Garden</title>
      <meta
        name="description"
        content="Escape into nature at Patao Pocket Patio & Plant Sanctuary. Botanical gardens, resort pools, garden café, nature trails, and unforgettable moments in a tropical paradise."
      />
      <meta
        name="keywords"
        content="botanical garden, nature resort, plant sanctuary, swimming pool, garden café, nature trail, patao pocket, eco tourism, tropical garden, weekend getaway, photography spot, outdoor dining"
      />
      <meta name="author" content="Patao Pocket Patio & Plant Sanctuary" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:title"
        content="Patao Pocket Patio & Plant Sanctuary — Nature Resort & Botanical Garden"
      />
      <meta
        property="og:description"
        content="Discover breathtaking botanical gardens, relaxing resort pools, peaceful patios, and unforgettable moments surrounded by nature."
      />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Patao Pocket Patio & Plant Sanctuary" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={SITE_URL} />
      <meta
        name="twitter:title"
        content="Patao Pocket Patio & Plant Sanctuary — Nature Resort & Botanical Garden"
      />
      <meta
        name="twitter:description"
        content="Discover breathtaking botanical gardens, relaxing resort pools, peaceful patios, and unforgettable moments surrounded by nature."
      />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional structured data: LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Patao Pocket Patio & Plant Sanctuary',
          image: OG_IMAGE,
          '@id': SITE_URL,
          url: SITE_URL,
          telephone: '+63 912 345 6789',
          email: 'hello@pataosanctuary.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Patao Pocket',
            addressRegion: 'Nature Valley',
            addressCountry: 'PH',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 11.223741647405047,
            longitude: 123.69582244191017,
          },
          priceRange: '₱₱',
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '20:00',
          },
        })}
      </script>
    </Helmet>
  );
}
