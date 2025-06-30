import { useState } from "react";
interface TouchedType {
  email?: boolean;
  name?: boolean;
  year?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  phone?: boolean;
}
const useTouched = () => {
  const [touched, setTouched] = useState<TouchedType>({
    email: false,
    name: false,
    year: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });
  const touchedEmail = () => setTouched({ ...touched, email: true });
  const touchedFullName = () => setTouched({ ...touched, name: true });
  const touchedDateOfBirth = () => setTouched({ ...touched, year: true });
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
