import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/authentication', request.url));
  }
}

export const config = {
  matcher: ['/graphiql', '/restfull'],
};
