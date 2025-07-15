import { loginAPI, userInfoAPI } from "@/services/user.service";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const res = await loginAPI(body);
    const token = res?.data.token;

    if (!token) {
      return Response.json(
        { message: "Không lấy được token" },
        {
          status: 400,
        }
      );
    }
    const resInfo = await userInfoAPI(token);
    const isAdmin = resInfo?.data.role === true;
    return Response.json(
      { res, isAdmin },
      {
        status: 200,
        headers: {
          "Set-Cookie": `${
            isAdmin ? `tokenAdmin=${token}` : `token=${token}`
          }; Path=/; HttpOnly; Max-Age=86400`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: (error as Error).message || "Đăng nhập thất bại!" },
      { status: 400 }
    );
  }
}
