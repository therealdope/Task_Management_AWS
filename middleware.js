import { NextResponse } from "next/server"

export function middleware(request) {
  // Get the path
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login"

  // Get the auth token from cookies
  const authToken = request.cookies.get("auth-token")?.value || ""

  // Redirect logic
  if (isPublicPath && authToken) {
    // If user is on login page but already authenticated, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !authToken) {
    // If user is not authenticated and trying to access a protected route, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Continue with the request if no redirects are needed
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/", "/dashboard", "/tasks", "/login"],
}

