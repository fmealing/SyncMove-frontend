import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  imageUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  url,
  imageUrl,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default SEO;
