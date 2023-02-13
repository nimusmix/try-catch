import { Helmet } from 'react-helmet-async';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkState } from '../../recoil';

interface ISEOMetaTagProps {
  title: string;
  description: string;
  keywords: string;
  img: string;
  siteUrl: string;
}
const SEOMetaTag = ({ title, description, siteUrl, keywords, img }: ISEOMetaTagProps) => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content="index,follow" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={siteUrl} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      <link rel="canonical" href={siteUrl} />
      {isDark ? (
        <link href="https://unpkg.com/prism-themes/themes/prism-one-dark.css" rel="stylesheet" />
      ) : (
        <link href="https://unpkg.com/prism-themes/themes/prism-one-light.css" rel="stylesheet" />
      )}
    </Helmet>
  );
};

export default SEOMetaTag;
