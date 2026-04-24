import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")
  const isPublicRoute = 
    req.nextUrl.pathname.startsWith("/Login") ||
    req.nextUrl.pathname.startsWith("/signup") ||
    req.nextUrl.pathname.startsWith("/auth")

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/Login", req.url))
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}