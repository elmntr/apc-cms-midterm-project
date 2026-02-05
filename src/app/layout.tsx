import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Unseen Journey - Personal Biography",
  description: "A personal biography journey from childhood to present",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
