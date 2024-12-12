import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import BackToTopButton from "@/Components/BackToTop/BackToTop";
import { Roboto, Source_Serif_4, Inter, Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import UserPrefsContext from "@/context/UserPrefsContext";
import { cookies } from "next/headers";

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
  weight: "100 900",
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

type locationDataType = {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IP: string;
  state: string;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <Footer />
          </div>
        </UserPrefsContext>
      </body>
    </html>
  );
}
