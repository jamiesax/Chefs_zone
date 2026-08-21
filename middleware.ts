import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Create a base response object
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 2. Guard against missing env variables to prevent unhandled Edge crashes
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  // 3. Initialize Supabase SSR client with synchronized cookie management
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Sync request cookies for down-stream Server Components
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        // Re-create response object to append updated cookies
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // 4. Safely refresh auth session
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, images, and favicons
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};