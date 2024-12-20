import type { Metadata } from "next";
import "./globals.css";
import UserState from "./context/UserState";
import ShopState from "./context/ShopState";
import EditorState from "./context/EditorState";

const avenirnext = ({
  src: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1734690014/rxc5dynomgfbsfuebjt4.png",
  variable: "--fonts-avenir-next",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vizora",
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
