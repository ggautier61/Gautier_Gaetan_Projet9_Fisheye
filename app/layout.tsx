import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fisheye",
  description: "FishEye permet aux photographes indépendants de présenter leurs meilleurs travaux",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col items-center">{children}</body>
    </html>
  );
}
