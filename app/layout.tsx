import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serenity Secrets | Build Your Egypt Story",
  description: "A visual, date-aware way to build and book your Egypt trip.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
