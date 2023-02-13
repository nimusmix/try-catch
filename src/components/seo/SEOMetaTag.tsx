import { Helmet } from 'react-helmet-async';

interface ISEOMetaTagProps {
  title: string;
  description: string;
  keywords: string;
  img: string;
  siteUrl: string;
}
const SEOMetaTag = ({ title, description, siteUrl, keywords, img }: ISEOMetaTagProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content="index,follow" data-react-helmet="true" />
      <meta name="description" content={description} data-react-helmet="true" />
      <meta name="keywords" content={keywords} data-react-helmet="true" />

      <meta property="og:title" content={title} data-react-helmet="true" />
      <meta property="og:site_name" content={title} data-react-helmet="true" />
      <meta property="og:description" content={description} data-react-helmet="true" />
      <meta property="og:type" content="website" data-react-helmet="true" />
      <meta property="og:image" content={img} data-react-helmet="true" />
      <meta property="og:url" content={siteUrl} data-react-helmet="true" />

      <meta name="twitter:title" content={title} data-react-helmet="true" />
      <meta name="twitter:description" content={description} data-react-helmet="true" />
      <meta name="twitter:image" content={img} data-react-helmet="true" />

      <link rel="canonical" href={siteUrl} data-react-helmet="true" />
    </Helmet>
  );
};

export default SEOMetaTag;
