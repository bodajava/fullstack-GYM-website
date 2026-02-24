import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EliteGYM | Pushing Limits",
  description: "Modern high-performance fitness center and gym.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0d0d0d',
              color: '#fff',
              border: '1px solid rgba(var(--primary), 0.2)',
              textTransform: 'uppercase',
              fontSize: '12px',
              letterSpacing: '0.1em',
              borderRadius: '0',
            },
          }}
        />
      </body>
    </html>
  );
}
