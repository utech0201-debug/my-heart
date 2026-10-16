import { Dancing_Script, Nunito } from "next/font/google";
import "./globals.css";

const script = Dancing_Script({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-script" });
const sans = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-sans" });

export const metadata = { title: "For Bernice 💖", description: "A letter for you" };
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${script.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
