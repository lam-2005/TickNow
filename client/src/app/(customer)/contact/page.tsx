"use client";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Liên hệ với TickNow</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Thông tin liên hệ */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Hotline</h4>
              <p className="text-foreground">1900 1234 (8:00 - 22:00, hàng ngày)</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Email hỗ trợ</h4>
              <p className="text-foreground">support@ticknow.vn</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Văn phòng</h4>
              <p className="text-foreground">Lầu 3, Tòa nhà ABC, Quận 1, TP.HCM</p>
            </div>
          </div>
        </div>

        {/* Form liên hệ (tĩnh) */}
        <div>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-primary"
                placeholder="Nhập họ tên của bạn"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-primary"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">
                Nội dung
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-primary"
                placeholder="Bạn cần hỗ trợ điều gì?"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-foreground py-2 px-6 rounded hover:bg-opacity-90 transition"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
