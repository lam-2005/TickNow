import { useState } from "react";

export type UserFormType = "login" | "signup" | "reset";

const useUserForm = (initialForm: UserFormType = "login") => {
  const [form, setForm] = useState<UserFormType>(initialForm);

  const openLogin = () => setForm("login");
  const openSignUp = () => setForm("signup");
  const openReset = () => setForm("reset");

  return { form, openLogin, openSignUp, openReset };
};

export default useUserForm;
