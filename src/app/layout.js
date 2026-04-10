import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Amiron Ресторан первоклассный в Бухаре",
  description: "Ресторан Amiron в Бухаре предлагает первоклассные блюда узбекской кухни в уютной атмосфере. Наслаждайтесь традиционными вкусами и гостеприимством в нашем ресторане.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
};