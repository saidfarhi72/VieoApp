import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-calendar/dist/Calendar.css";

import { siteConfig } from "@/config/site";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { ModalProviderTril } from "@/components/providers/modal-provider";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";
import { LoadingModal } from "@/components/modals/loding-modal";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/log.png",
      href: "/log.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme={"bumblebee"} className="h-full bg-base-100">
      <ConvexClientProvider>
        <EdgeStoreProvider>
          <QueryProvider>
            <Toaster />
            <ModalProviderTril />
            <ModalProvider />

            <body className={inter.className}>{children}</body>
          </QueryProvider>
        </EdgeStoreProvider>
      </ConvexClientProvider>
    </html>
  );
}
