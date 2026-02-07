import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const port = url.port;
    const pathname = url.pathname;

    // ----- PORT 3000: User Panel (Public) -----
    if (port === "3000") {
        // Prevent access to /admin routes on Port 3000
        if (pathname.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    // ----- PORT 3001: Admin Panel (Secure) -----
    if (port === "3001") {
        // Redirect root "/" to "/admin" for convenience
        if (pathname === "/") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        // Optional: Block non-admin routes if strict separation is desired
        // For now, we allow them to view the site, but priority is Admin.
    }

    // Continue with default behavior (auth check etc.)
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
