"use client";
import Button from "@/components/Button/Button";
import { useAuth } from "@/hooks/contexts/useAuth";
import { Voucher } from "@/interfaces/vouchers.interface";
import { checkoutTicket } from "@/services/ticket.service";
import { getVoucherList } from "@/services/vouchers.service";
import {
  getTicket,
  saveTicket,
  TicketTypeLocalStorage,
} from "@/utils/saveTicket";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = () => {
  const [ticket, setTicket] = useState<TicketTypeLocalStorage | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const router = useRouter();
  const [discountValue, setDiscountValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [idVoucher, setIdVoucher] = useState("");
  useEffect(() => {
    // Load ticket khi component mount
    const storedTicket = getTicket();
    setTicket(storedTicket);

    // Lắng nghe custom event 'ticket-updated'
    const handleTicketUpdated = () => {
      const updatedTicket = getTicket();
      setTicket(updatedTicket);
    };

    window.addEventListener("ticket-updated", handleTicketUpdated);

    return () => {
      window.removeEventListener("ticket-updated", handleTicketUpdated);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchVouchers = async () => {
      try {
        const res = await getVoucherList();
        const data = res.voucher;
        setVouchers(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch vouchers", error);
        setLoading(false);
      }
    };
    fetchVouchers();
  }, []);
  if (loading) console.log("đang tải...");

  const handleApplyDiscount = () => {
    const voucher = vouchers.find(
      (v) => v.code.toLowerCase().trim() === discountCode.toLowerCase()
    );
    if (!voucher) {
      toast.error("Mã giảm giá không hợp lệ!");
      setDiscountValue(0);
      return;
    }

    const now = new Date();
    const startDate = new Date(voucher.start_date);
    const endDate = new Date(voucher.end_date || "");

    if (now < startDate) {
      toast.error("Mã giảm giá không hợp lệ!");
      setDiscountValue(0);
      return;
    }

    if (now > endDate) {
      toast.info("Mã giảm giá đã hết hạn!");
      setDiscountValue(0);
      return;
    }

    if (voucher.user_count >= voucher.max_users) {
      toast.info("Mã giảm giá đã hết lượt sử dụng!");
      setDiscountValue(0);
      return;
    }

    setDiscountValue(voucher.discount_type);
    setIdVoucher(voucher._id);
    setDiscountCode("");
    toast.success(`Áp dụng thành công! Giảm ${voucher.discount_type}%`);
  };

  const priceDiscount = (ticket?.price || 0) * (discountValue / 100);
  const totalPrice = Math.max((ticket?.price || 0) - priceDiscount, 0);
  useEffect(() => {
    if (ticket && totalPrice) {
      ticket.total = totalPrice;
      saveTicket(ticket);
    }
  }, [totalPrice]);

  const handleCheckout = async () => {
    if (!user?.token) {
      toast.warning("Vui lòng đăng nhập để thanh toán");
      return;
    }
    try {
      const res = await checkoutTicket(user.token, {
        price: ticket?.total || "",
        screening: ticket?.screening?.screeningInfo._id || "",
        voucher: idVoucher,
        seat: ticket?.seats || [],
      });

      if (res) router.push(res?.payUrl);
    } catch (error) {
      toast.error(`Thanh toán không thành công: ${error}`);
    }
  };

  return (
    <div className="flex flex-col bg-background-card p-5 rounded-[10px] gap-5 w-full">
      <h2 className="text-xl font-semibold">Thanh toán</h2>

      <div className="space-y-[15px] w-full">
        <p>Phương thức thanh toán</p>
        <div className="space-y-[10px]">
          <div className="active [&.active]:border-primary w-full border-2 border-foreground flex gap-2.5 items-center py-2.5 px-[15px] rounded-[5px] hover:border-primary transition-colors duration-300">
            <div className="size-7.5 bg-amber-200 rounded-[5px] relative overflow-hidden">
              <Image
                src={"/logo/payos.webp"}
                alt="vnpay-logo"
                sizes="30px"
                fill
                className="object-cover"
              />
            </div>
            <span>payOS</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-2.5 items-center">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Mã giảm giá"
          className="border border-gray-400 rounded-[5px] focus:border-foreground outline-none w-full px-4 py-2 transition-colors duration-300"
        />
        <button
          onClick={handleApplyDiscount}
          className="bg-primary text-white rounded-[5px] px-4 py-2 text-nowrap disabled:brightness-50 w-full sm:w-auto"
          disabled={discountCode.trim() === ""}
        >
          Áp dụng
        </button>
      </div>

      <div className="w-full space-y-[15px]">
        <p>Chi phí</p>
        <div className="space-y-[5px] text-sm">
          <div className="flex justify-between">
            <span>Thanh toán</span>
            <strong>
              {ticket?.price ? ticket?.price.toLocaleString("vi-Vn") : 0} ₫
            </strong>
          </div>
          <div className="flex justify-between">
            <span>Ưu đãi</span>
            <strong>
              {priceDiscount ? priceDiscount.toLocaleString("vi-VN") : 0} ₫
            </strong>
          </div>
          <div className="flex justify-between">
            <span>Phí</span>
            <strong>0 ₫</strong>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Tổng cộng</span>
            <strong>
              {totalPrice.toLocaleString("vi-VN") ||
                ticket?.price.toLocaleString("vi-VN")}{" "}
              ₫
            </strong>
          </div>
        </div>
        <div className="space-y-2.5 mt-5">
          <Button
            title="Thanh toán"
            className="w-full"
            onClick={handleCheckout}
          />
          <Button
            title="Quay lại"
            btnSecondary
            onClick={() => router.back()}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
