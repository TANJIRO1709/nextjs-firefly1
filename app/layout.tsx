import type { Metadata } from "next";
import "./globals.css";

const avenirnext = ({
  src: "./assets/fonts/AvenirNextLTPro-Regular.otf",
  variable: "--fonts-avenir-next",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Firefly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${avenirnext.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
