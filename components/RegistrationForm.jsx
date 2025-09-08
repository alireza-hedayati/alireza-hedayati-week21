import React from "react";
import registerSchema from "@/validation/registerSchema";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../public/Union.png";
import useRegister from "@/helpers/useRegister";
import Link from "next/link";

function RegistrationForm() {
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const submitHandler = (data) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  return (
    <div className="w-full bg-[#f7f7f7] h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-10">بوت کمپ بوتو استارت</h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white w-2/6 h-[550px] px-10 py-12 rounded-3xl shadow-md flex flex-col justify-center items-center"
      >
        <Image src={logo} />
        <h2 className="py-7 text-2xl font-bold">فرم ثبت نام</h2>
        <div className="custom-input-div">
          <input
            type="text"
            {...register("username")}
            placeholder="نام کاربری"
            className="input"
          />
          <span className="error">{errors.username?.message}</span>
        </div>

        <div className="custom-input-div">
          <input
            type="password"
            {...register("password")}
            placeholder="رمز عبور"
            className="input"
          />
          <span className="error">{errors.password?.message}</span>
        </div>
        <div className="custom-input-div">
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="تکرار رمز عبور"
            className="input"
          />
          <span className="error">{errors.confirmPassword?.message}</span>
        </div>
        <button
          type="submit"
          className="w-[90%] border-none bg-blue-500 text-lg rounded-lg py-1 text-stone-100 font-semibold hover:opacity-80"
        >
          ثبت نام
        </button>
        <Link href="/login" className="self-start px-4 py-3 text-base font-medium text-blue-500 hover:text-blue-900 transition-colors">حساب کاربری دارید؟</Link>
      </form>
    </div>
  );
}

export default RegistrationForm;





