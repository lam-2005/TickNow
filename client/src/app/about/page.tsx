import React from "react";

const AboutPage = () => {
  return (
    <div>
      <section className="text-center mb-16">
        <h1 className="flex-center text-white z-11 text-3xl font-bold mt-8 mb-4">VỀ TICKNOW</h1>
        <div className="bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto">
          <p>
            TickNow là một nền tảng đặt vé xem phim trực tuyến hiện đại, được phát triển bởi nhóm sinh viên Trường Cao đẳng FPT Polytechnic Hồ Chí Minh. Dự án được thực hiện với mong muốn mang đến trải nghiệm đặt vé tiện lợi, nhanh chóng và thân thiện cho người dùng yêu điện ảnh.
          </p>
        </div>
      </section>
      <section className="text-center mb-16">
        <h1 className="flex-center text-white z-11 text-3xl font-bold mt-8 mb-4">SỨ MỆNH</h1>
        <div className="grid md:grid-cols-3 gap-6 pl-4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-primary font-bold text-xl mb-2">01</h3>
            <p>Góp phần tăng trưởng thị phần điện ảnh, văn hóa, giải trí của người Việt Nam.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-primary font-bold text-xl mb-2">02</h3>
            <p>Phát triển dịch vụ xuất sắc với mức giá tối ưu, phù hợp với thu nhập người Việt Nam.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-primary font-bold text-xl mb-2">03</h3>
            <p>Mang nghệ thuật điện ảnh, văn hóa Việt Nam hội nhập quốc tế.</p>
          </div>
        </div>
      </section>
      <section className="text-center mb-16">
        <h1 className="flex-center text-white z-11 text-3xl font-bold mt-8 mb-4">MỤC TIÊU DỰ ÁN</h1>
        <div className="space-y-6 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-4">
            <span className="text-primary font-bold text-2xl">1</span>
            <p>Tạo ra một giải pháp đặt vé xem phim trực tuyến dễ sử dụng cho cả người dùng phổ thông và rạp phim.</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-primary font-bold text-2xl">2</span>
            <p>Kết nối người xem với các cụm rạp tại TP.HCM thông qua hệ thống trung gian hiện đại.</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-primary font-bold text-2xl">3</span>
            <p>Giúp người dùng tìm kiếm lịch chiếu, đặt vé, chọn ghế và thanh toán online chỉ trong vài bước đơn giản.</p>
          </div>
        </div>
      </section>
      <section className="text-center mb-16">
        <h1 className="flex-center text-white z-11 text-3xl font-bold mt-8 mb-4">ĐIỂM NỔI BẬT</h1>
        <div className="space-y-4 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-4">
            <span className="text-primary text-2xl">★</span>
            <p>Giao diện thân thiện, hiện đại: Thiết kế bằng React.js, tối ưu trải nghiệm người dùng trên cả máy tính và điện thoại.</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-primary text-2xl">★</span>
            <p>Chức năng đặt vé thông minh: Tìm kiếm phim, chọn suất chiếu theo rạp, ngày giờ, vị trí ghế ngồi rõ ràng.</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-primary text-2xl">★</span>
            <p>Tích hợp thanh toán online: Hỗ trợ nhiều phương thức thanh toán nhanh chóng và an toàn.</p>
          </div>
        </div>
      </section>
      <section className="text-center">
        <h1 className="flex-center text-white z-11 text-3xl font-bold mt-8 mb-4">TẦM NHÌN TƯƠNG LAI</h1>
        <div className="bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto">
          <p>
            TickNow không chỉ là một bài tập học thuật mà còn hướng đến việc trở thành nền tảng ứng dụng thực tế, có thể triển khai và mở rộng trên thị trường. Nhóm đặt mục tiêu tiếp tục cải tiến tính năng, tích hợp các hệ thống rạp lớn và mở rộng dịch vụ ra nhiều tỉnh thành.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;