import type { Metadata } from "next";
import "./globals.css";
import UserState from "./context/UserState";
import ShopState from "./context/ShopState";
import EditorState from "./context/EditorState";

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
        <EditorState>
          <UserState>
            <ShopState>
            {children}
            </ShopState>
          </UserState>
        </EditorState>
      </body>
    </html>
  );
}
