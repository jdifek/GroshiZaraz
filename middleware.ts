import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {

  // Извлекаем локаль из пути
  const defaultLocale = "uk";

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
