import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Godly Women | The Sisterhood's Marketplace",
  description: "Godly Women is a trusted sisterhood for genuine profiles, honest reviews, and community.",
  keywords: ["faith", "inspiration", "community", "spirituality", "women"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
