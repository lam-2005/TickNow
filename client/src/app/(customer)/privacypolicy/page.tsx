import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "Tìm hiểu về cách TickNow bảo vệ thông tin cá nhân của bạn, quyền và nghĩa vụ của khách hàng theo quy định.",
};
const sectionTitle = (text: string) => (
  <h2 className="flex-left text-primary text-xl font-semibold mt-8 mb-4">
    {text}
  </h2>
);

const contentWrapper = (children: React.ReactNode) => (
  <div className="pl-4">{children}</div>
);

const listItems = (items: string[], ordered = false) =>
  ordered ? (
    <ol className="list-decimal list-inside pl-4">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  ) : (
    <ul className="list-disc list-inside">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );

const contactInfo = () => (
  <div className="pl-4">
    <p>NHÓM SINH VIÊN TICKNOW</p>
    <p>Trường Cao đẳng FPT Polytechnic Hồ Chí Minh</p>
    <p>Địa chỉ: Công viên phần mềm Quang Trung, Quận 12, TP.HCM</p>
    <p>Email: support@ticknow.vn</p>
    <p>Website: www.ticknow.vn</p>
    <p>Hotline-Zalo: 0833703639</p>
  </div>
);

const privacyPolicy = () => {
  return (
    <div className="pl-4">
      <h1 className="flex-center text-primary font-semibold mt-8 mb-4">
        Chính Sách Bảo Mật
      </h1>
      <p>
        TickNow cam kết sẽ bảo mật những thông tin mang tính riêng tư của bạn.
        Vui lòng đọc bản “Chính sách bảo mật” dưới đây để hiểu những cam kết mà
        chúng tôi thực hiện nhằm tôn trọng và bảo vệ quyền lợi của người truy
        cập.
      </p>

      {sectionTitle("1. MỤC ĐÍCH THU THẬP THÔNG TIN")}
      {contentWrapper(
        <>
          <p>Việc thu thập dữ liệu bao gồm:</p>
          {listItems([
            "Họ và tên;",
            "Ngày, tháng, năm sinh;",
            "Giới tính;",
            "Thông tin tài khoản thanh toán;",
            "Địa chỉ email.",
          ])}
          <p>
            Đây là các thông tin cần thiết khi đăng ký sử dụng dịch vụ để
            TickNow xác nhận và hỗ trợ người dùng.
          </p>
          <p>
            Khách hàng chịu trách nhiệm bảo mật tài khoản, thông báo kịp thời
            khi có hành vi sử dụng trái phép.
          </p>
        </>
      )}

      {sectionTitle("2. PHẠM VI SỬ DỤNG THÔNG TIN")}
      {contentWrapper(
        <>
          <p>TickNow sử dụng thông tin khách hàng để:</p>
          {listItems([
            "Cung cấp dịch vụ;",
            "Gửi thông báo liên quan đến dịch vụ;",
            "Ngăn ngừa hành vi giả mạo, phá hoại;",
            "Liên hệ trong trường hợp đặc biệt;",
            "Không sử dụng ngoài mục đích giao dịch;",
            "Cung cấp cho cơ quan pháp luật nếu được yêu cầu.",
          ])}
        </>
      )}

      {sectionTitle("3. THỜI GIAN LƯU TRỮ THÔNG TIN")}
      {contentWrapper(
        <p>
          Dữ liệu cá nhân được lưu trữ đến khi khách hàng yêu cầu hủy. Trong mọi
          trường hợp, thông tin sẽ được bảo mật trên máy chủ của TickNow.vn.
        </p>
      )}

      {sectionTitle("4. ĐỊA CHỈ CỦA ĐƠN VỊ THU THẬP")}
      {contactInfo()}

      {sectionTitle("5. QUYỀN VÀ NGHĨA VỤ CỦA KHÁCH HÀNG")}
      {contentWrapper(
        <>
          <p className="font-semibold">A. Quyền của Khách Hàng</p>
          {listItems(
            [
              "Được biết về hoạt động xử lý dữ liệu cá nhân.",
              "Đồng ý hoặc từ chối cho phép xử lý dữ liệu.",
              "Truy cập, chỉnh sửa dữ liệu cá nhân.",
              "Rút lại sự đồng ý.",
              "Yêu cầu xóa dữ liệu cá nhân.",
              "Hạn chế xử lý dữ liệu (thực hiện trong 72h).",
              "Yêu cầu cung cấp dữ liệu cá nhân.",
              "Phản đối xử lý dữ liệu vì quảng cáo, tiếp thị.",
              "Khiếu nại, tố cáo, khởi kiện.",
              "Yêu cầu bồi thường thiệt hại.",
              "Tự bảo vệ quyền cá nhân theo luật dân sự.",
            ],
            true
          )}

          <p className="font-semibold mt-4">B. Nghĩa vụ của Khách Hàng</p>
          {listItems(
            [
              "Tự bảo vệ dữ liệu cá nhân.",
              "Tôn trọng dữ liệu của người khác.",
              "Cung cấp chính xác thông tin khi đồng ý xử lý.",
              "Phổ biến kỹ năng bảo vệ dữ liệu.",
              "Thực hiện đúng quy định pháp luật liên quan.",
              "Các nghĩa vụ khác theo luật định.",
            ],
            true
          )}

          <p className="font-semibold mt-4">C. Dữ liệu cá nhân của trẻ em</p>
          <p>
            TickNow bảo vệ dữ liệu trẻ em (dưới 16 tuổi), yêu cầu sự đồng ý của
            trẻ (từ 7 tuổi) và cha mẹ hoặc người giám hộ. TickNow sẽ xóa dữ liệu
            khi có yêu cầu phù hợp từ phụ huynh hoặc cơ quan chức năng.
          </p>

          <p className="font-semibold mt-4">
            D. Dữ liệu cá nhân của người mất tích, đã chết
          </p>
          <p>
            TickNow chỉ xử lý dữ liệu khi có sự đồng ý của vợ/chồng hoặc con
            thành niên của người đã mất, trừ khi pháp luật cho phép xử lý mà
            không cần sự đồng ý.
          </p>
        </>
      )}

      {sectionTitle("6. LIÊN HỆ")}
      {contactInfo()}
    </div>
  );
};

export default privacyPolicy;
