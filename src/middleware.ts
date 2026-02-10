import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


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

        // Exclude specific paths from auth check to prevent infinite loops
        const isAuthPage = pathname.startsWith("/auth") || pathname.startsWith("/api/auth") || pathname.startsWith("/_next") || pathname.includes("icon");

        if (!isAuthPage) {
            console.log(`[Middleware] Checking auth for: ${pathname}`);
            const token = await getToken({
                req: request,
                secret: process.env.NEXTAUTH_SECRET
            });
            console.log(`[Middleware] Token found:`, !!token, token?.role);

            if (!token || token.role !== 'admin') {
                console.log(`[Middleware] Access denied. Redirecting to signin.`);
                const signInUrl = new URL("/auth/signin", request.url);
                return NextResponse.redirect(signInUrl);
            }
        }
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
