import "../styles/globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Providers from "../utils/provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HummingBird",
  description: "by Naegongal",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="initial-scale=1, width=device-width"
      />
      <meta
        name="google-site-verification"
        content="1ylBmkxIrA6GseGT6Gbf-wCU4ALz3W-BHY6UuLLyU3c"
      />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
