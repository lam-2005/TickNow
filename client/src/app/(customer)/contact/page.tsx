"use client";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const validateAll = () => {
    const newErrors = {
      name: formData.name.trim() ? "" : "Vui lòng nhập họ và tên",
      phone: !formData.phone.trim()
        ? "Vui lòng nhập số điện thoại"
        : !/^\d{10,11}$/.test(formData.phone)
        ? "Số điện thoại không hợp lệ"
        : "",
      email: !formData.email.trim()
        ? "Vui lòng nhập email"
        : !/\S+@\S+\.\S+/.test(formData.email)
        ? "Email không hợp lệ"
        : "",
      message: formData.message.trim() ? "" : "Vui lòng nhập nội dung",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:1001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          content: formData.message,
        }),
      });

      const result = await res.json();
      if (result.status) {
        alert(result.message || "Gửi liên hệ thành công!");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setErrors({ name: "", phone: "", email: "", message: "" });
      } else {
        alert("Gửi thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi gửi liên hệ:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Liên hệ với TickNow</h2>

      <div className="grid md:grid-cols-2 gap-10">
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
              <p className="text-foreground">Công viên phần mềm Quang Trung, Quận 12, TP.HCM</p>
            </div>
          </div>
        </div>

        <div>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-white"
                placeholder="Nhập họ tên của bạn"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium mb-1">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-white"
                placeholder="Nhập số điện thoại của bạn"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-white"
                placeholder="example@gmail.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">Nội dung</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-white"
                placeholder="Bạn cần hỗ trợ điều gì?"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-foreground py-2 px-6 rounded hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Đang gửi..." : "Gửi liên hệ"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
