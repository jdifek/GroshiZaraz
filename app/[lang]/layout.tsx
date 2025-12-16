import "../globals.css";
import { ReactNode } from "react";
import { StructuredData } from "../structured-data/StructuredData";
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { headers } from 'next/headers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  
  try {
    const messages = (await import(`../messages/${lang}.json`)).default;
    const cleanPath = pathname.replace(/^\/(uk|ru)/, '') || '/';

    return {
      title: messages.Metadata.root.title,
      description: messages.Metadata.root.description,
      keywords: messages.Metadata.root.keywords,
      robots: "index, follow",
      openGraph: {
        title: messages.Metadata.root.title,
        description: messages.Metadata.root.description,
        url: `https://groshi-zaraz.vercel.app/${lang}${cleanPath}`,
        siteName: "Фіногляд",
        type: "website",
        locale: lang === "uk" ? "uk_UA" : "ru_UA",
        images: [
          {
            url: "https://groshi-zaraz.vercel.app/og-image.jpg",
            width: 1200,
            height: 630,
            alt: messages.Metadata.root.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: messages.Metadata.root.title,
        description: messages.Metadata.root.description,
        images: ["https://groshi-zaraz.vercel.app/og-image.jpg"],
        site: "@finoglyad",
        creator: "@finoglyad",
      },
      
      alternates: {
        canonical: `https://groshi-zaraz.vercel.app/${lang}${cleanPath}`,
        languages: {
          "uk-UA": `https://groshi-zaraz.vercel.app/uk${cleanPath}`,
          "ru-UA": `https://groshi-zaraz.vercel.app/ru${cleanPath}`,
          "x-default": `https://groshi-zaraz.vercel.app${cleanPath}`,
        },
      },
    } as Metadata;
  } catch (error) {
    console.error(`Failed to load metadata for lang ${lang}:`, error);
    return {
      title: "404 - Страница не найдена",
      description: "Запрашиваемая страница не существует.",
    } as Metadata;
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;  // ⬅️ Изменено на Promise
}) {
  const { lang } = await params;  // ⬅️ Добавлен await
  let messages;
  try {
    messages = (await import(`../messages/${lang}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for lang ${lang}:`, error);
    messages = (await import("../messages/uk.json")).default;
  }

  return (
    <html lang={lang === "uk" ? "uk" : "ru"}>
      <body className="bg-gradient-to-br from-blue-50 to-white text-[#0A2540]">
        <Toaster position="top-right" reverseOrder={false} />
        <NextIntlClientProvider locale={lang} messages={messages}>
          <StructuredData />
          <Header />
          <main className="min-h-[60vh] max-w-[1280px] mx-auto px-4 md:px-8 py-8">
            {children}
          </main>
          <Footer lang={lang} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }];
}