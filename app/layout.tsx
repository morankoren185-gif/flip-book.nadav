import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Rubik } from "next/font/google";
import "@/styles/globals.css";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-hebrew",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
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
    <html lang="he" dir="rtl">
      <body className={`${rubik.variable} antialiased`}>{children}</body>
    </html>
  );
}
