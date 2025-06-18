import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Preload do CSS global para eliminar bloqueio de renderização */}
        <link
          rel="preload"
          href="/_next/static/css/4130931ab118d551.css"
          as="style"
          onLoad={(e) => { (e.target as HTMLLinkElement).rel = 'stylesheet'; }}
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/4130931ab118d551.css" />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 