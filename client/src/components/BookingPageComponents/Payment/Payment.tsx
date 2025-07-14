"use client";
import Button from "@/components/Button/Button";
import { useAuth } from "@/hooks/contexts/useAuth";
import { Voucher } from "@/interfaces/vouchers.interface";
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
    const endDate = new Date(voucher.end_day);

    if (now < startDate || now > endDate) {
      toast.info("Mã giảm giá hết hạn!");
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

  const handleCheckout = () => {
    if (!user?.token) {
      toast.warning("Vui lòng đăng nhập để thanh toán");
      return;
    }
    console.log({
      price: ticket?.total,
      screening: ticket?.screening?.screeningInfo._id,
      voucher: idVoucher,
      seat: ticket?.seats,
    });
  };

  return (
    <div className="flex-column items-center bg-background-card flex-1 p-5 rounded-[10px] gap-5">
      <h2>Thanh toán</h2>
      <div className="space-y-[15px] w-full">
        <p>Phương thức thanh toán</p>
        <div className="space-y-[10px]">
          <div className="active [&.active]:border-primary w-full border-2 border-foreground flex gap-2.5 items-center py-2.5 px-[15px] rounded-[5px] hover:border-primary transition-colors duration-300">
            <div className="size-7.5 bg-amber-200 rounded-[5px] relative overflow-hidden">
              <Image
                src={"/logo/vnpay.webp"}
                alt="vnpay-logo"
                sizes="30px"
                fill
                className="object-cover"
              />
            </div>
            <span>VNPAY</span>
          </div>
          <div className="w-full border-2 border-foreground flex gap-2.5 items-center py-2.5 px-[15px] rounded-[5px] hover:border-primary transition-colors duration-300">
            <div className="size-7.5 bg-amber-200 rounded-[5px] relative overflow-hidden">
              {" "}
              <Image
                src={"/logo/momo.webp"}
                alt="momo-logo"
                fill
                sizes="30px"
                className="object-cover"
              />
            </div>
            <span>Momo</span>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-2.5 items-center">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Mã giảm giá"
          className="border-1 border-gray-400 rounded-[5px] focus:border-foreground outline-none w-full px-4 py-2 transition-colors duration-300"
        />
        <button
          onClick={handleApplyDiscount}
          className="bg-primary text-white rounded-[5px] px-4 py-2 text-nowrap disabled:brightness-50"
          disabled={discountCode.trim() === ""}
        >
          Áp dụng
        </button>
      </div>
      <div className="w-full space-y-[15px]">
        <p>Chi phí</p>
        <div className="space-y-[5px]">
          <div className="w-full flex justify-between">
            <span>Thanh toán</span>
            <strong>
              {ticket?.price ? ticket?.price.toLocaleString("vi-Vn") : 0} ₫
            </strong>
          </div>
          <div className="w-full flex justify-between">
            <span>Ưu đãi</span>
            <strong>
              {priceDiscount ? priceDiscount.toLocaleString("vi-VN") : 0} ₫
            </strong>
          </div>
          <div className="w-full flex justify-between">
            <span>Phí</span>
            <strong>0 ₫</strong>
          </div>
          <div className="w-full flex justify-between">
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
          <Button title="Quay lại" btnSecondary onClick={() => router.back()} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
