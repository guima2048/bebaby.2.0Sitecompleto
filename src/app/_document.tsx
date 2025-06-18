import { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';

export default function Document() {
  // Lê o CSS crítico limpo do arquivo
  const criticalCss = fs.readFileSync('critical-clean.css', 'utf8');
  return (
    <Html lang="pt-BR">
      <Head>
        {/* CSS crítico inline para renderização instantânea */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
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