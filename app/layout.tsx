import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/provider/TranStackProvider";

const inter = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <TanStackProvider>{children}</TanStackProvider>{" "}
      </body>
    </html>
  );
}
