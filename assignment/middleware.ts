// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function middleware(req: NextRequest) {
  // Only run for dashboard and profile routes
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
    const supabase = await createClient();

    // getSession will look for cookies on server
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply to these paths
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
