import React from 'react';
import { Helmet } from 'react-helmet';

const BASE_URL = 'https://maca-quran.vercel.app';

const SEO = ({ 
  title, 
  description, 
  keywords = '', 
  path = '', 
  image = '/logo512.png',
  type = 'website',
  surahNumber = null,
  surahName = null 
}) => {
  const fullTitle = title 
    ? `${title} | Maca Quran` 
    : 'Maca Quran - Baca Al-Quran Online dengan Terjemahan Indonesia';
  
  const defaultDescription = 'Aplikasi baca Al-Quran online gratis dengan terjemahan bahasa Indonesia, audio murottal, tajwid berwarna, pencarian ayat, bookmark, dan ayat harian.';
  const fullDescription = description || defaultDescription;
  
  const defaultKeywords = 'quran, al-quran, baca quran, quran online, terjemahan quran, quran indonesia, murottal, tajwid, ayat harian, aplikasi quran, maca quran';
  const fullKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  
  const fullUrl = `${BASE_URL}${path}`;
  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  // Generate structured data for Surah pages
  const structuredData = surahNumber && surahName ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Surah ${surahName} - Al-Quran`,
    "description": fullDescription,
    "url": fullUrl,
    "image": fullImage,
    "publisher": {
      "@type": "Organization",
      "name": "Maca Quran"
    },
    "inLanguage": ["id", "ar"],
    "isPartOf": {
      "@type": "Book",
      "name": "Al-Quran",
      "bookFormat": "EBook"
    }
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Maca Quran" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
