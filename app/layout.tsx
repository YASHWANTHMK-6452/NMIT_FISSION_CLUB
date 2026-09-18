import type { Metadata } from "next";
import Providers from "./components/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FISSION — AI Starts Here",
  description:
    "FISSION — Artificial Intelligence & Machine Learning Student Club at NMIT Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}