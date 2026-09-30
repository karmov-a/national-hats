import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Наследие — кабардинские головные уборы",
  description: "Традиционные головные уборы кабардинского народа - история, культура, красота",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
