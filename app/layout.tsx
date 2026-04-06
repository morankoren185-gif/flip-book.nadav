import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Frank_Ruhl_Libre, Rubik, Secular_One } from "next/font/google";
import "@/styles/globals.css";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-hebrew",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

const secularOne = Secular_One({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-secular",
  display: "swap"
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-frank-ruhl",
  display: "swap"
});

export const metadata: Metadata = {
  title: "פליצה לא מחליטה עליי — ספר דיגיטלי",
  description: "ספר ילדים בעברית"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${rubik.variable} ${secularOne.variable} ${frankRuhl.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
