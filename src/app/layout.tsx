import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Dummy Clothes Shop",
  description: "Simple e-commerce example with Next.js and Razorpay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            // ── Global toast style (dark + green glow) ──
            style: {
              background: "rgba(17, 17, 17, 0.95)",   // almost black, semi‑transparent
              color: "#e5e7eb",                         // light gray text
              border: "1px solid rgba(34, 197, 94, 0.3)", // green‑500/30
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.6), 0 0 12px rgba(34, 197, 94, 0.2)", // dark + green glow
            },

            // ── Success toast ──
            success: {
              style: {
                borderColor: "rgba(34, 197, 94, 0.5)",
                background: "rgba(34, 197, 94, 0.12)",
              },
              iconTheme: {
                primary: "#22c55e",   // green‑500
                secondary: "#000",
              },
            },

            // ── Error toast ──
            error: {
              style: {
                borderColor: "rgba(239, 68, 68, 0.5)",
                background: "rgba(239, 68, 68, 0.12)",
              },
              iconTheme: {
                primary: "#ef4444",   // red‑500
                secondary: "#000",
              },
            },

            // ── Loading toast (optional) ──
            loading: {
              style: {
                borderColor: "rgba(251, 191, 36, 0.5)",
                background: "rgba(251, 191, 36, 0.12)",
              },
            },
          }}
          containerStyle={{
            bottom: "2rem",          // spacing from bottom
          }}/>
      </body>
    </html>
  );
}
