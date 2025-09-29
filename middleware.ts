import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  console.log("Middleware URL:", request.nextUrl.pathname);
  console.log("Middleware locale:", request.nextUrl.locale);

  // Извлекаем локаль из пути
  const pathname = request.nextUrl.pathname;
  const defaultLocale = "uk";
  const locale = pathname.startsWith("/uk")
    ? "uk"
    : pathname.startsWith("/ru")
    ? "ru"
    : defaultLocale;
  console.log("Extracted locale:", locale);

  return createMiddleware({
    locales: ["uk", "ru"],
    defaultLocale,
    localePrefix: "always", // Явно указываем локаль в URL
    localeDetection: false,
  })(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Исключаем _next и файлы с расширениями
};
