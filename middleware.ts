import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
} as const;

export function middleware(request: NextRequest) {
  // Skip next internal requests
  if (request.nextUrl.pathname.startsWith('/_next')) return;

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Let's redirect if there is no locale
  if (pathnameIsMissingLocale && !pathname.includes('.')) {
    const locale = i18n.defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  // We can enable redirect just from root
  // matcher: "/"
};
