import { NextResponse, NextRequest } from "next/server";
// import { matcher } from "./middleware.config";
export const privateRoute = {
  user: [
    "/profile",
    "/booking-history",
    "/booking-successful",
    "/booking-failed",
  ],
  admin: ["/admin"],
};
const authRoute = ["/auth-admin"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const tokenAdmin = request.cookies.get("tokenAdmin")?.value;
  if (privateRoute.user.some((url) => pathname.startsWith(url)) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    privateRoute.admin.some((url) => pathname.startsWith(url)) &&
    !tokenAdmin
  ) {
    return NextResponse.redirect(new URL("/auth-admin/login", request.url));
  }
  if (authRoute.some((url) => pathname.startsWith(url)) && tokenAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}
