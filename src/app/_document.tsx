import { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';
import path from 'path';

export default function Document() {
  // Lê o CSS crítico limpo do arquivo
  const criticalCss = fs.readFileSync('critical-clean.css', 'utf8');

  // Caminho absoluto para a pasta de CSS gerado
  const cssDir = path.join(process.cwd(), '.next/static/css');
  let cssLinks = [];

  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
    cssLinks = cssFiles.map(file => (
      <link
        key={file}
        rel="preload"
        href={`/_next/static/css/${file}`}
        as="style"
        onLoad={(e) => { e.currentTarget.rel = 'stylesheet'; }}
      />
    ));
  }

  return (
    <Html lang="pt-BR">
      <Head>
        {/* CSS crítico inline para renderização instantânea */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        {/* Preload dinâmico dos CSS gerados */}
        {cssLinks}
        <noscript>
          {cssLinks.map(link => (
            <link
              key={link.props.href}
              rel="stylesheet"
              href={link.props.href}
            />
          ))}
        </noscript>
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