
# TickNow  

TickNow là một dự án web cung cấp các chức năng chính liên quan đến việc đặt vé xem phim và quản lý rạp chiếu phim.  

## Website
  
Truy cập website tại: [ticknow.xyz](https://ticknow.xyz)  
> **Lưu ý**: Khi truy cập website, do API backend được host trên server miễn phí nên có thể mất một chút thời gian để khởi tạo lần đầu. Vui lòng chờ vài phút nếu thấy website tải lâu

Tài khoản đăng nhập: 
> Email: abc@gmail.com

> Mật khẩu: 123456

Trang Dashboard: [ticknow.xyz/admin](https://ticknow.xyz/admin)  
> **Email**: admin@gmail.com

> **Password**: 123123

## Chức năng chính  

### Người dùng  

- **Hiển thị phim**: Danh sách phim sắp chiếu và đang chiếu.  
- **Lịch chiếu**: Cho phép chọn ngày chiếu, phim chiếu và rạp chiếu.  
- **Bài viết**: Xem các bài viết liên quan đến phim và rạp.  
- **Xem chi tiết phim**: Hiển thị thông tin chi tiết về phim, bao gồm lịch chiếu theo ngày và địa điểm rạp chiếu.  
- **Đặt ghế**: Chọn ghế ngồi và đặt vé.  
- **Thanh toán online**: Hỗ trợ thanh toán trực tuyến.  
- **Quản lý tài khoản**: Đăng nhập, đăng ký, đăng xuất.  
- ...

### Admin  

- **Thống kê doanh thu**:  
    - Theo năm, tháng, ngày.  
    - Theo phim và rạp (lọc theo ngày).  
- **Quản lý dữ liệu**:  
    - Phim, suất chiếu, người dùng, rạp, v.v.  

## Hướng dẫn cài đặt  

### Clone dự án  

```bash  
git clone https://github.com/lam-2005/TickNow.git
cd client  
```  

### Cấu hình môi trường  

1. Tạo file `.env` và `.env.local` dựa trên các file mẫu `env.example` và `env.example.local`.  
2. Cập nhật các giá trị cần thiết trong file `.env` và `.env.local`.  

### Cài đặt dependencies  

```bash  
npm install  
```  

### Chạy dự án  

```bash
npm run build
npm start  
```  
