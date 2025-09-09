import React from "react";
import productSchema from "../validation/addProductSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/helpers/constant";
import ProductForm from "./ProductForm";

function AddModal({ onClose, isOpen }) {
  const queryClient = useQueryClient();

  const { reset } = useForm({
    resolver: yupResolver(productSchema),
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return api.post("/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      reset();
      onClose();
    },
    onError: (error) => {
      console.log("Mutation Error:", error.response?.data || error.message);
    },
  });

  if (!isOpen) return null;

  const submitHandler = (data) => {
    mutation.mutate({
      name: data.name,
      quantity: Number(data.quantity),
      price: Number(data.price),
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[3px] bg-black/5 flex items-center justify-center">
      <div className="w-96 bg-white p-5 rounded-2xl flex flex-col  items-center shadow-xl">
        <p className="text-lg font-semibold py-3">ایجاد محصول</p>

        <ProductForm submitHandler={submitHandler} onClose={onClose} />
      </div>
    </div>
  );
}

export default AddModal;
