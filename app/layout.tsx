
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from '@/providers/theme-provider';
import DesignerContextProvider from "@/components/context/EditorContext";
import "./globals.css";
 
const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UI Maker",
  description: "Maker components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative ${font.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DesignerContextProvider>
            {children}
          </DesignerContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
