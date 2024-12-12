import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import BackToTopButton from "@/Components/BackToTop/BackToTop";
import { Roboto, Source_Serif_4, Inter, Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import UserPrefsContext from "@/context/UserPrefsContext";
import { cookies } from "next/headers";
import { TagsType } from "@/lib/types/tags";
import { CategoriesType } from "@/lib/types/categories";
import { GetTags } from "@/lib/api/getTags";
import { GetCategories } from "@/lib/api/getCategory";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-open-sans",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-source-serif-4",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-inter",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 500 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "fedup",
  description: "A blogging website",
};

type LayoutStyleType = "grid" | "list";
type ThemeModeType = "dark" | "light";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags: TagsType = await GetTags();
  const categories: CategoriesType = await GetCategories();
  const cookieStore = await cookies();

  const storedLayoutStyle: LayoutStyleType =
    (cookieStore.get("layoutStyle")?.value as LayoutStyleType) || "grid";
  const storedThemeMode: ThemeModeType =
    (cookieStore.get("themeMode")?.value as ThemeModeType) || "light";

  return (
    <html
      lang="en"
      className={`${storedThemeMode === "light" ? "lightMode" : "darkMode"}`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${sourceSerif4.variable} ${inter.variable} ${openSans.variable}`}
      >
        <UserPrefsContext
          storedLayoutStyle={storedLayoutStyle}
          storedThemeMode={storedThemeMode}
        >
          <div className="mainAppContainer">
            <Navbar />
            {children}
            <BackToTopButton />
            <Footer tags={tags} categories={categories} />
          </div>
        </UserPrefsContext>
      </body>
    </html>
  );
}
