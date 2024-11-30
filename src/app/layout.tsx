import type { ReactNode } from "react";
import { connectToMongoDB } from "@/lib/db";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { getClientGeoData } from "@/utils/GeoData/geo";
import { GeoProvider } from "@/components/providers/GeoProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface Props {
  readonly children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const geoData = await getClientGeoData();

  connectToMongoDB();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Shopping</title>
        <meta
          name="description"
          content="Shopping service for all your needs"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen overflow-auto antialiased break-words`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            storageKey="e-commerce-dev"
          >
            <GeoProvider initialData={geoData}>
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </GeoProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
