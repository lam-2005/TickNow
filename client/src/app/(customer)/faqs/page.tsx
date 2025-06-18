"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "Tôi có thể đặt vé xem phim như thế nào trên TickNow?",
    answer:
      "Bạn có thể chọn phim, rạp chiếu, suất chiếu và tiến hành thanh toán ngay trên website TickNow một cách nhanh chóng và tiện lợi.",
  },
  {
    question: "Làm sao để kiểm tra vé đã đặt?",
    answer:
      "Sau khi đặt vé thành công, bạn sẽ nhận được email xác nhận và có thể kiểm tra vé trong mục 'Vé của tôi'.",
  },
  {
    question: "TickNow có hỗ trợ hoàn hoặc đổi vé không?",
    answer:
      "Hiện tại TickNow không hỗ trợ hoàn hoặc đổi vé. Vui lòng kiểm tra kỹ thông tin trước khi thanh toán.",
  },
  {
    question: "Tôi có thể thanh toán bằng những phương thức nào?",
    answer:
      "Bạn có thể thanh toán qua ví điện tử (Momo, ZaloPay), thẻ ATM nội địa hoặc thẻ tín dụng.",
  },
  {
    question: "Tôi chưa nhận được email vé sau khi thanh toán?",
    answer:
      "Vui lòng kiểm tra mục thư rác (Spam). Nếu vẫn chưa nhận được, hãy liên hệ bộ phận hỗ trợ của TickNow.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Câu hỏi thường gặp</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-600 rounded-xl bg-background overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
            >
              <span className="text-lg font-medium text-left">{faq.question}</span>
              {openIndex === index ? (
                <FaMinus className="text-primary" />
              ) : (
                <FaPlus className="text-primary" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-300 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
