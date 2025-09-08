import api from "./constant";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => {
      return api.post("/auth/register", data);
    },
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد");
      router.replace("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطا در ثبت نام");
    },
  });
};

export default useRegister;
