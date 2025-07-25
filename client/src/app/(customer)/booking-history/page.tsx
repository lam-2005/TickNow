import Link from "next/link";
import TableTicket from "./TableTicket";
import { getTicketUserList } from "@/services/ticket.service";
import { cookies } from "next/headers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lịch sử đặt vé",
};
const Profile = async () => {
  const tokenStore = cookies();
  const token = (await tokenStore).get("token")?.value || "";
  const res = await getTicketUserList("?page=1&limit=5", token);
  const dataTicket = res?.data;

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
      <TableTicket data={dataTicket} token={token} />
    </div>
  );
};

export default Profile;
