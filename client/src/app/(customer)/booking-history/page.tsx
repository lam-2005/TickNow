import Link from "next/link";
import TableTicket from "./TableTicket";
import { getTicketUserList } from "@/services/ticket.service";
import { cookies } from "next/headers";

const Profile = async () => {
  const tokenStore = cookies();
  const token = (await tokenStore).get("token")?.value || "";
  const res = await getTicketUserList(token);
  const dataTicket = res?.data.ticket;

  return (
    <div className="container flex-column items-center mt-10 gap-10">
      <h2>Thông tin cá nhân</h2>
      <div className="space-x-10">
        <Link href={"/profile"}>
          <button className="[&.active]:bg-primary [&.active]:border-transparent [&.active]:text-white py-2.5 px-5 rounded-[100px] font-bold hover:bg-primary hover:text-white hover:border-transparent transition-colors duration-300 border-1 border-foreground text-sm">
            Tài khoản của tôi
          </button>
        </Link>
        <button className="active [&.active]:bg-primary [&.active]:border-transparent [&.active]:text-white py-2.5 px-5 rounded-[100px] font-bold hover:bg-primary hover:text-white hover:border-transparent transition-colors duration-300 border-1 border-foreground text-sm">
          Lịch sử đặt vé
        </button>
      </div>
      <TableTicket data={dataTicket} />
    </div>
  );
};

export default Profile;
