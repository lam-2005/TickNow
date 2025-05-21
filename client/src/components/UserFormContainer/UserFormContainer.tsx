"use client";
import Image from "next/image";
import LoginForm from "./LoginForm";
import { IoMdClose } from "react-icons/io";
import SignUpForm from "./SignUpForm";
import ResetPasswordForm from "./ResetPasswordForm";
import useUserForm from "@/hooks/useUserForm";

const UserFormContainer = ({
  setOpenUserFormContainer,
}: {
  setOpenUserFormContainer: () => void;
}) => {
  const { form, openLogin, openSignUp, openReset } = useUserForm();

  return (
    <div className="w-screen h-screen flex fixed z-1002">
      <div
        className="backdrop-blur-md w-full h-full"
        onClick={setOpenUserFormContainer}
      ></div>
      <div
        data-aos="slide-left"
        data-aos-mirror={false}
        className={`fixed  w-[488px] h-screen bg-background-card top-0 right-0 p-7.5 max-[601px]:w-full flex-column items-center overflow-y-auto no-scrollbar`}
      >
        <button
          className="absolute top-0 right-0 translate-y-5 -translate-x-5"
          onClick={setOpenUserFormContainer}
        >
          <span className="text-2xl">
            <IoMdClose />
          </span>
        </button>
        <div className="mt-10 mb-5">
          <Image
            src="/logo/logo.png"
            alt="logo-ticknow"
            height={50}
            className="object-cover"
            width={200}
            priority
          />
        </div>
        {form === "login" && (
          <LoginForm setOpenForm={openSignUp} setOpenReset={openReset} />
        )}
        {form === "signup" && <SignUpForm setOpenForm={openLogin} />}
        {form === "reset" && <ResetPasswordForm setOpenForm={openSignUp} />}
      </div>
    </div>
  );
};

export default UserFormContainer;
