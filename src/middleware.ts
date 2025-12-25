import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/(.*)']);

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  const token = await (await auth()).getToken();


  // This adds redirect from old `/landing` url to `/`
  if (pathname === '/landing') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users hitting `/sign-in`, `/sign-up` or `/` to `/dashboard`
  if (token) {
    if (pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  // Protect private routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
