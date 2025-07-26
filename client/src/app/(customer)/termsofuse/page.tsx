import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng",
  description:
    "Đọc kỹ điều khoản sử dụng dịch vụ của TickNow – nền tảng đặt vé xem phim trực tuyến. Cam kết bảo vệ quyền lợi và thông tin cá nhân của người dùng.",
};
const sectionTitle = (text: string) => (
  <h2 className="text-primary text-2xl font-bold text-center uppercase mt-6 mb-2">
    {text}
  </h2>
);

const listItems = (items: React.ReactNode[]) => (
  <div className="space-y-6">
    {items.map((item, i) => (
      <div key={i}>{item}</div>
    ))}
  </div>
);

const termsOfUse = () => {
  return (
    <div className="px-6 md:px-20 lg:px-40 text-white text-center pb-12">
      <h1 className="text-primary text-3xl font-bold mt-8 mb-6">
        ĐIỀU KHOẢN SỬ DỤNG
      </h1>

      <p className="mb-4">
        Chào mừng và cảm ơn Quý Khách Hàng đã đến với website:{" "}
        <strong>ticknow.vn</strong> <br />
        Website này thuộc quyền sở hữu và được quản lý bởi nhóm TickNow – sinh
        viên năm cuối Trường Cao đẳng FPT Polytechnic Hồ Chí Minh. <br />
        Website được sử dụng để đặt vé xem phim và cung cấp thông tin liên quan
        đến hệ thống rạp chiếu phim Cinestar Cinemas. <br />
        Khi truy cập vào website, Quý Khách Hàng cần đảm bảo đủ tuổi theo quy
        định pháp luật. Nếu là trẻ em, cần có sự đồng ý của người giám hộ.{" "}
        <br />
        Việc sử dụng website đồng nghĩa với việc đồng ý toàn bộ các điều khoản
        tại đây.
      </p>

      <p className="mb-6 font-semibold">
        Xin vui lòng đọc kỹ những nội dung sau:
      </p>

      {listItems([
        <>
          {sectionTitle("Miễn trừ trách nhiệm")}
          <p>
            Khi truy cập và sử dụng website, Quý Khách Hàng đồng ý rằng việc sử
            dụng là hoàn toàn tự nguyện và chịu mọi rủi ro liên quan. TickNow
            không đảm bảo website luôn hoạt động liên tục, không lỗi hoặc không
            bị gián đoạn. <br />
            Chúng tôi không chịu trách nhiệm về thiệt hại từ việc sử dụng dữ
            liệu, lỗi kỹ thuật, hoặc các tổn thất gián tiếp khác phát sinh trong
            quá trình truy cập.
          </p>
        </>,
        <>
          {sectionTitle("Trách nhiệm của người sử dụng")}
          <p>
            Người dùng cần đảm bảo các thông tin cung cấp là đúng sự thật và hợp
            pháp. Việc sử dụng website phải phù hợp với quy định pháp luật hiện
            hành. <br />
            Người dùng không được sử dụng website cho mục đích vi phạm pháp
            luật, phát tán mã độc, hay thu thập thông tin trái phép. <br />
            Nếu thông tin sai lệch gây thiệt hại, khách hàng sẽ hoàn toàn chịu
            trách nhiệm trước pháp luật và TickNow.
          </p>
        </>,
        <>
          {sectionTitle("Nội dung website")}
          <p>
            Tất cả nội dung trên website được chúng tôi biên soạn từ các nguồn
            đáng tin cậy và cập nhật thường xuyên nhằm phục vụ người dùng tốt
            nhất. <br />
            Tuy nhiên, chúng tôi không đảm bảo tính chính xác tuyệt đối của mọi
            thông tin và có thể điều chỉnh mà không cần thông báo. <br />
            Việc sử dụng thông tin là quyền của người dùng, và chúng tôi không
            chịu trách nhiệm về hậu quả nếu sử dụng sai cách.
          </p>
        </>,
        <>
          {sectionTitle("Bảo mật thông tin")}
          <p>
            TickNow cam kết không chia sẻ thông tin cá nhân của khách hàng cho
            bên thứ ba nếu không có sự đồng ý. <br />
            Thông tin được lưu trữ và bảo vệ bằng các biện pháp kỹ thuật phù hợp
            nhằm đảm bảo tính an toàn. <br />
            Người dùng nên giữ bí mật tài khoản của mình và không chia sẻ thông
            tin đăng nhập cho người khác.
          </p>
        </>,
        <>
          {sectionTitle("Nội dung tải lên của khách hàng")}
          <p>
            Nếu khách hàng đăng tải bất kỳ nội dung nào lên website, phải đảm
            bảo nội dung đó không vi phạm pháp luật hay thuần phong mỹ tục.{" "}
            <br />
            TickNow có quyền xem xét, chỉnh sửa hoặc xoá các nội dung vi phạm mà
            không cần thông báo trước. <br />
            Mọi hành vi đăng tải nội dung mang tính lừa đảo, phản động, kích
            động bạo lực đều bị nghiêm cấm tuyệt đối.
          </p>
        </>,
        <>
          {sectionTitle("Bản quyền website")}
          <p>
            Toàn bộ nội dung, hình ảnh, thiết kế và mã nguồn thuộc quyền sở hữu
            của nhóm TickNow và Cinestar Cinemas. <br />
            Việc sao chép, trích dẫn hoặc tái sử dụng phải có sự đồng ý bằng văn
            bản. <br />
            Mọi hành vi vi phạm sẽ bị xử lý theo quy định pháp luật về sở hữu
            trí tuệ và bản quyền.
          </p>
        </>,
        <>
          {sectionTitle("Liên kết đến website khác")}
          <p>
            Website của chúng tôi có thể chứa liên kết đến các trang khác không
            thuộc quyền kiểm soát của TickNow. <br />
            Việc truy cập các liên kết này là do người dùng tự quyết định và
            chúng tôi không chịu trách nhiệm về nội dung tại đó. <br />
            Người dùng nên đọc kỹ điều khoản sử dụng và chính sách bảo mật của
            các trang liên kết trước khi truy cập.
          </p>
        </>,
        <>
          {sectionTitle("Luật áp dụng và giải quyết tranh chấp")}
          <p>
            Mọi tranh chấp phát sinh từ việc sử dụng website này sẽ được giải
            quyết theo pháp luật nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam. <br />
            Ưu tiên giải quyết tranh chấp bằng thương lượng và hòa giải. <br />
            Nếu không đạt được thoả thuận, vụ việc sẽ được chuyển đến cơ quan có
            thẩm quyền tại TP.HCM để xử lý.
          </p>
        </>,
        <>
          {sectionTitle("Tính riêng lẻ")}
          <p>
            Nếu bất kỳ điều khoản nào trong tài liệu này bị xem là không hợp lệ
            hoặc không thể thi hành, các điều khoản còn lại vẫn giữ nguyên hiệu
            lực. <br />
            Điều khoản bị vô hiệu sẽ được điều chỉnh để phù hợp với pháp luật mà
            vẫn giữ được mục đích ban đầu. <br />
            Điều này giúp duy trì tính toàn vẹn và hiệu quả của toàn bộ điều
            khoản sử dụng.
          </p>
        </>,
        <>
          {sectionTitle("Thông tin liên hệ")}
          <p>
            Mọi thắc mắc, phản hồi hoặc yêu cầu hỗ trợ liên quan đến website xin
            vui lòng liên hệ:
            <br />
            <strong>NHÓM SINH VIÊN TICKNOW</strong>
            <br />
            Trường Cao đẳng FPT Polytechnic Hồ Chí Minh <br />
            Địa chỉ: Công viên phần mềm Quang Trung, Quận 12, TP.HCM <br />
            Email: contact@ticknow.vn <br />
            Hotline/Zalo: 0833703639
          </p>
        </>,
      ])}
    </div>
  );
};

export default termsOfUse;
