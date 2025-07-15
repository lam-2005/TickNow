import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type } = body;
  const cookieName = type === "admin" ? "tokenAdmin" : "token";

  return NextResponse.json(
    { message: "Đã đăng xuất" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `${cookieName}=; Path=/; HttpOnly; Max-Age=0`,
      },
    }
  );
}
