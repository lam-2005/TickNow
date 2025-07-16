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

  const validateField = (name: string, value: string): string => {
    let message = "";
    if (name === "name" && !value.trim()) {
      message = "Vui lòng nhập họ và tên";
    }
    if (name === "phone") {
      if (!value.trim()) message = "Vui lòng nhập số điện thoại";
      else if (!/^\d{10,11}$/.test(value))
        message = "Số điện thoại không hợp lệ";
    }
    if (name === "email") {
      if (!value.trim()) message = "Vui lòng nhập email";
      else if (!/\S+@\S+\.\S+/.test(value)) message = "Email không hợp lệ";
    }
    if (name === "message" && !value.trim()) {
      message = "Vui lòng nhập nội dung";
    }

    return message;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear lỗi nếu người dùng bắt đầu chỉnh sửa lại
    if (errors[name as keyof typeof errors]) {
      const newError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: newError }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors: typeof errors = {
      name: "",
      phone: "",
      email: "",
      message: "",
    };

    Object.entries(formData).forEach(([key, value]) => {
      const errorMsg = validateField(key, value);
      newErrors[key as keyof typeof newErrors] = errorMsg;
      if (errorMsg) hasError = true;
    });

    setErrors(newErrors);

    if (!hasError) {
      alert("Đã gửi liên hệ thành công!");
      console.log("Data gửi:", formData);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setErrors({ name: "", phone: "", email: "", message: "" });
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Liên hệ với TickNow
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Hotline</h4>
              <p className="text-foreground">
                1900 1234 (8:00 - 22:00, hàng ngày)
              </p>
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
              <p className="text-foreground">
                Công viên phần mềm Quang Trung, Quận 12, TP.HCM
              </p>
            </div>
          </div>
        </div>

        <div>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-primary"
                placeholder="Nhập họ tên của bạn"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-primary"
                placeholder="Nhập số điện thoại của bạn"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-primary"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">
                Nội dung
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 bg-background text-foreground rounded outline-none border border-gray-600 focus:border-primary"
                placeholder="Bạn cần hỗ trợ điều gì?"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
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
