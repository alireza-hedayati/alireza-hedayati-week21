"use client";
import Image from "next/image";
import close from "../public/Close.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/helpers/constant";

function DeleteModal({ onClose, selectedProduct }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      onClose();
    },
  });

  const deleteHandler = (selectedProduct) => {
    mutation.mutate(selectedProduct.id);
    onClose();
  };

  return (
    <div className=" inset-0 fixed  backdrop-blur-[3px] bg-black/10  flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center bg-slate-200 rounded-lg py-8 px-20  ">
        <Image src={close} />
        <p className="text-lg font-semibold mt-5">
          آیا از حذف این محصول مطمئنید؟
        </p>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => deleteHandler(selectedProduct)}
            className="bg-red-500 text-base font-semibold text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-100"
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-base font-semibold text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-100"
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
