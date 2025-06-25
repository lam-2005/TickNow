export type FieldsType = {
  email?: string;
  name?: string;
  year?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};
export type RegisterRequestType = Omit<FieldsType, "confirmPassword">;
type ErrorsType = {
  [key: string]: string;
};

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^0\d{9}$/;

const validateForm = (values: FieldsType): ErrorsType => {
  const errors: ErrorsType = {};

  if (!values.email || values.email.trim() === "") {
    errors.email = "Email là bắt buộc";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!values.name || values.name.trim() === "") {
    errors.name = "Họ và tên là bắt buộc";
  }

  if (!values.year || values.year.trim() === "") {
    errors.year = "Ngày sinh là bắt buộc";
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

export default validateForm;
