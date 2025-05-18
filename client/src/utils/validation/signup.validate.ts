export type SignupFields = {
  email?: string;
  fullName?: string;
  dateOfBirth?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

type SignupErrors = {
  [key: string]: string;
};

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^0\d{9}$/;

const validateSignup = (values: SignupFields): SignupErrors => {
  const errors: SignupErrors = {};

  if (!values.email || values.email.trim() === "") {
    errors.email = "Email là bắt buộc";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!values.fullName || values.fullName.trim() === "") {
    errors.fullName = "Họ và tên là bắt buộc";
  }

  if (!values.dateOfBirth || values.dateOfBirth.trim() === "") {
    errors.dateOfBirth = "Ngày sinh là bắt buộc";
  }

  if (!values.phone || values.phone.trim() === "") {
    errors.phone = "Số điện thoại là bắt buộc";
  } else if (!phoneRegex.test(values.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }

  if (!values.password) {
    errors.password = "Mật khẩu là bắt buộc";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  return errors;
};

export default validateSignup;
