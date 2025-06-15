import { useState } from "react";
interface TouchedType {
  email?: boolean;
  fullName?: boolean;
  dateOfBirth?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  phone?: boolean;
}
const useTouched = () => {
  const [touched, setTouched] = useState<TouchedType>({
    email: false,
    fullName: false,
    dateOfBirth: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });
  const touchedEmail = () => setTouched({ ...touched, email: true });
  const touchedFullName = () => setTouched({ ...touched, fullName: true });
  const touchedDateOfBirth = () =>
    setTouched({ ...touched, dateOfBirth: true });
  const touchedPassword = () => setTouched({ ...touched, password: true });
  const touchedConfirmPassword = () =>
    setTouched({ ...touched, confirmPassword: true });
  const touchedPhone = () => setTouched({ ...touched, phone: true });
  return {
    touched,
    touchedEmail,
    touchedFullName,
    touchedDateOfBirth,
    touchedPassword,
    touchedConfirmPassword,
    touchedPhone,
  };
};

export default useTouched;
