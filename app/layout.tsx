import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from './providers'
import Header from "@/app/ui/header"
import Footer from "./ui/footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ComicWave 24",
  description: "Official site for the ComicWave 24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="flex justify-center">
            <div>{children}</div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
