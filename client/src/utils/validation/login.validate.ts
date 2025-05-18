import { emailRegex } from "./signup.validate";
export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.email || values.email.trim() === "") {
    errors.email = "Email không được để trống";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!values.password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải từ 6 ký tự trở lên";
  }

  return errors;
}
