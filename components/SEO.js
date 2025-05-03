import Head from 'next/head';

const SEO = ({
  title = 'Today I Learned - Varun Yadav',
  description = 'A collection of code snippets, solutions and things I learn day to day.',
  canonicalUrl,
  ogType = 'website',
  ogImage,
  children
}) => {
  const siteUrl = 'https://til.varunyadav.com';
  const fullTitle = title.includes('Varun Yadav')
    ? title
    : `${title} | Varun Yadav`;
  const finalCanonicalUrl = canonicalUrl ? canonicalUrl : siteUrl;
  const defaultOgImage = `${siteUrl}/og-image.png`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:site_name" content="Today I Learned - Varun Yadav" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@varun1_yadav" />
      <meta name="twitter:creator" content="@varun1_yadav" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />

      {children}
    </Head>
  );
};

export default SEO;
