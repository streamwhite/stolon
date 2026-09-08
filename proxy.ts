import { NextResponse, type NextRequest } from "next/server";
import { getClientKey, getPageType, getRetryAfter } from "@/lib/page-rate-limit";

export async function proxy(request: NextRequest) {
  const pageType = getPageType(request.nextUrl.pathname);
  const retryAfter = await getRetryAfter(pageType, getClientKey(request));
  if (retryAfter === null) return NextResponse.next();
  return NextResponse.json(
    { message: "Too many page requests", code: "PAGE_RATE_LIMITED" },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};