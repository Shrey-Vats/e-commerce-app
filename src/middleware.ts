import { NextResponse, NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const url = request.nextUrl;

    if(token && 
        (
            url.pathname.startsWith("/sign-in") ||
            url.pathname.startsWith("/sign-up") ||
            url.pathname.startsWith("/verify") 
        )
    ) {
          return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if(!token && 
        (
            url.pathname.startsWith("/dashboard") ||
            url.pathname === "/"
        )
    ) {
          return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if(token?.roles === "USER" && (
        url.pathname.startsWith("/create") 
    )){
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()


}
 
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    "/",
    "/verify/:path*",
    "/dashboard/:path*",
  ]
}