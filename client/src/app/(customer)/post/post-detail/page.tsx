"use client";

import React from "react";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import Image from "next/image";


const PostDetailPage = () => {
  return (
    <>
      <BackgroundPage
        image="postdetail.webp"
        title="Chi tiết khuyến mãi"
      />

      <div className="container mx-auto px-4 py-10 text-white">
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
            🎉 Ưu đãi tháng 6 – Nhận quà xinh khi đi xem phim!
          </h1>

          <p className="mb-4 leading-relaxed">
            Hè này đi xem phim tại TickNow và nhận ngay những phần quà siêu dễ thương (hàng limited nha mọi người)!
            <br />
            Hơn 200 phần quà đã được chuẩn bị sẵn sàng để gửi tặng khán giả thân yêu!
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-pink-400">
            📌 Cách thức tham gia:
          </h2>

          <ul className="list-disc list-inside space-y-2">
            <li>
              Áp dụng cho khách hàng mua vé xem phim từ ngày{" "}
              <span className="font-medium text-green-400">21/6 đến hết ngày 30/6/2025</span> tại TickNow.
            </li>
            <li>
              Mỗi giao dịch từ{" "}
              <span className="font-medium text-green-400">180.000 VNĐ</span> trở lên sẽ được nhận 1 phần quà (1 quà / 1 lần giao dịch).
            </li>
            <li>
              Áp dụng cho cả vé mua trực tiếp, máy bán vé tự động và đặt online, in vé tại rạp.
            </li>
            <li>
              Quét mã QR quan tâm trang Zalo của Trung tâm để hợp lệ nhận quà.
            </li>
            <li>
              Số lượng quà tặng có hạn, chương trình kết thúc sớm nếu hết quà!
            </li>
          </ul>

          <p className="mt-6 italic text-sm text-gray-300">
            ☀️ Tháng 6 này hãy cùng bạn bè và người thân ra rạp xem phim, tận hưởng mùa hè sôi động và nhận quà liền tay nhé!
          </p>

         <div className="mt-8 flex justify-center">
            <Image
              src="/offers/chitietkhuyenmai.webp"
              alt="Ưu đãi tháng 6"
              width={800}
              height={500}
              className="rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
