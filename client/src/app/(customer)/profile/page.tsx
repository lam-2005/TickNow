import ProfileInfo from "@/components/ProfilePage/ProfileInfo";
import { userInfoAPI } from "@/services/user.service";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Thông tin cá nhân",
  description:
    "Quản lý thông tin cá nhân, tài khoản và lịch sử đặt vé của bạn tại TickNow.",
};
const Profile = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value || "";
  let userInfo = null;
  if (token) {
    try {
      const res = await userInfoAPI(token);
      userInfo = res?.data;
    } catch (error) {
      console.error(error);
    }
  }
  if (!userInfo) {
    alert("Có lỗi khi lấy thông tin người dùng!");
  }
  return (
    <div className="container flex-column items-center mt-10 gap-10 max-sm:gap-4 max-sm:mt-5">
      <h2>Thông tin cá nhân</h2>
      <div className="flex flex-wrap gap-3 sm:gap-x-10 justify-center">
        <Link
          href={"/profile"}
          className="active [&.active]:bg-primary [&.active]:border-transparent [&.active]:text-white py-2.5 px-5 rounded-[100px] font-bold hover:bg-primary hover:text-white hover:border-transparent transition-colors duration-300 border-1 border-foreground text-sm"
        >
          Tài khoản của tôi
        </Link>
        <Link
          href={"/booking-history"}
          className="py-2.5 px-5 rounded-[100px] font-bold hover:bg-primary hover:text-white hover:border-transparent transition-colors duration-300 border-1 border-foreground text-sm"
        >
          Lịch sử đặt vé
        </Link>
      </div>

      <ProfileInfo info={userInfo} token={token} />
    </div>
  );
};

export default Profile;
