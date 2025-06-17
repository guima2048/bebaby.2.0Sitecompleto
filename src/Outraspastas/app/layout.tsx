import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationToast from "./components/NotificationToast";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeBaby - Site de Relacionamento Moderno e Seguro",
  description: "Encontre conexões autênticas em um ambiente seguro e respeitoso. Cadastre-se grátis e comece sua jornada de relacionamentos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NotificationProvider>
          <AuthProvider>
            <NotificationToast />
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
