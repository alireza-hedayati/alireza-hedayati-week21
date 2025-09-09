import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import api from "./constant";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      Cookies.set("token", data.token, { expires: 7 });
      const decoded = jwtDecode(data.token);
      localStorage.setItem("username", decoded.username);
      toast.success("ورود با موفقیت انجام شد");
      router.replace("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "مشکلی پیش آمده است");
    },
  });
};

export default useLogin;
