import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CategoriesBar from "@/Components/CategoriesBar/CategoriesBar";
import Navbar from "@/Components/Navbar/Navbar";

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
  title: "Volt",
  description: "A blogging website",
};

async function fetchCategories() {
  const apiURL = process.env.GRAPHQL_API_URL;
  if (!apiURL) {
    throw new Error("GRAPHQL_API_URL is not defined.");
  }

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query GetCategories {
          categories {
            nodes {
              id
              name
              slug
              link
            }
          }
        }`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return data.categories.nodes;
  } catch (error) {
    console.log("FETCH ERROR: " + error);
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetchCategories();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <div className="contentWrapper">
          <CategoriesBar nodes={categories} />
          {children}
        </div>
      </body>
    </html>
  );
}
