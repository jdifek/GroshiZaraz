import "../globals.css";
import { ReactNode } from "react";
import { StructuredData } from "../structured-data/StructuredData";
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { headers } from "next/headers";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  try {
    const messages = (await import(`../messages/${lang}.json`)).default;
    const cleanPath = pathname.replace(/^\/(uk|ru)/, "") || "/";

    return {
      title: messages.Metadata.root.title,
      description: messages.Metadata.root.description,
      keywords: messages.Metadata.root.keywords,
      robots: "index, follow",
      icons: {
        icon: "/favicon.svg", // ✅ фавикон для всех страниц
      },
      openGraph: {
        title: messages.Metadata.root.title,
        description: messages.Metadata.root.description,
        url: `https://finoglyad.com.ua/${lang}${cleanPath}`,
        siteName: "Фіногляд",
        type: "website",
        locale: lang === "uk" ? "uk_UA" : "ru_UA",
        images: [
          {
            url: "https://finoglyad.com.ua/og-image.jpg",
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
        images: ["https://finoglyad.com.ua/og-image.jpg"],
        site: "@finoglyad",
        creator: "@finoglyad",
      },

      alternates: {
        canonical: `https://finoglyad.com.ua/${lang}${cleanPath}`,
        languages: {
          "uk-UA": `https://finoglyad.com.ua/uk${cleanPath}`,
          "ru-UA": `https://finoglyad.com.ua/ru${cleanPath}`,
          "x-default": `https://finoglyad.com.ua${cleanPath}`,
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
  params: Promise<{ lang: string }>; // ⬅️ Изменено на Promise
}) {
  const { lang } = await params; // ⬅️ Добавлен await
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HJXK299WX6"
          strategy="afterInteractive"
        />

        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HJXK299WX6');
          `,
          }}
        />

        <Toaster position="top-right" reverseOrder={false} />

        <NextIntlClientProvider locale={lang} messages={messages}>
          <StructuredData />
          <Header lang={lang} />
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
