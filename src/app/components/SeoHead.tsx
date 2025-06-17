import Head from "next/head";

interface SeoHeadProps {
  title: string;
  description?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export default function SeoHead({ title, description, ogImage, ogTitle, ogDescription }: SeoHeadProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle || title} />
        {ogDescription && <meta property="og:description" content={ogDescription} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle || title} />
        {ogDescription && <meta name="twitter:description" content={ogDescription} />}
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta charSet="utf-8" />
        
        {/* Schema Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BeBaby.app",
          "url": "https://bebaby.app",
          "logo": "https://bebaby.app/main_impact.png",
          "sameAs": [
            "https://www.instagram.com/bebaby.app",
            "https://www.facebook.com/bebaby.app"
          ]
        }`}} />
        {/* Schema Review (Depoimentos) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "BeBaby.app",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "3"
          },
          "review": [
            {
              "@type": "Review",
              "author": {"@type": "Person", "name": "Maria"},
              "reviewBody": "O Bebaby.app mudou minha vida. Encontrei um sugar daddy incrível que me ajudou a realizar meus sonhos e viver experiências únicas.",
              "reviewRating": {"@type": "Rating", "ratingValue": "5"}
            },
            {
              "@type": "Review",
              "author": {"@type": "Person", "name": "João"},
              "reviewBody": "Como sugar daddy, encontrei no Bebaby.app uma plataforma segura e discreta para conhecer pessoas interessantes e compartilhar experiências.",
              "reviewRating": {"@type": "Rating", "ratingValue": "5"}
            },
            {
              "@type": "Review",
              "author": {"@type": "Person", "name": "Ana"},
              "reviewBody": "Ser sugar mommy no Bebaby.app me permitiu conhecer pessoas incríveis e viver momentos especiais em um ambiente seguro e respeitoso.",
              "reviewRating": {"@type": "Rating", "ratingValue": "5"}
            }
          ]
        }`}} />
        {/* Schema FAQ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "O que é um relacionamento sugar?",
              "acceptedAnswer": {"@type": "Answer", "text": "Relacionamento sugar é uma relação transparente e consensual entre sugar daddies, sugar babies e sugar mommies, baseada em benefícios, experiências e patrocínio."}
            },
            {
              "@type": "Question",
              "name": "Como funciona o site de sugar daddy para ganhar dinheiro?",
              "acceptedAnswer": {"@type": "Answer", "text": "No Bebaby.app, sugar babies podem encontrar sugar daddies e sugar mommies dispostos a oferecer patrocínio, presentes e experiências únicas. O cadastro é grátis e seguro."}
            },
            {
              "@type": "Question",
              "name": "O site é confiável e grátis para sugar babies?",
              "acceptedAnswer": {"@type": "Answer", "text": "Sim! O Bebaby.app é o site de sugar baby confiável e grátis, com perfis verificados, moderação ativa e privacidade garantida."}
            },
            {
              "@type": "Question",
              "name": "Existe app de sugar para celular?",
              "acceptedAnswer": {"@type": "Answer", "text": "Sim! Você pode acessar o Bebaby.app pelo navegador do seu celular ou instalar como app de sugar para ter acesso rápido e seguro ao universo sugar."}
            },
            {
              "@type": "Question",
              "name": "O que é uma sugar mommy?",
              "acceptedAnswer": {"@type": "Answer", "text": "Sugar mommy é uma mulher madura, bem-sucedida e generosa que busca sugar babies para compartilhar experiências, patrocínio e relacionamento sugar."}
            }
          ]
        }`}} />
      </Head>
    </>
  );
} 