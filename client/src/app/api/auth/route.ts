import { loginAPI } from "@/services/user.service";

export async function POST(request: Request) {
  const body = await request.json();
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
  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly`,
      },
    }
  );
}
