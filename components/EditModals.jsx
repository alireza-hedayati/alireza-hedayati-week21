import React from "react";
import ProductForm from "./ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/helpers/constant";

function EditModal({ onClose, product, editModal }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      return api.put(`/products/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      onClose();
    },
  });

  const submitHandler = (data) => {
    mutation.mutate({
      name: product.name,
      id: product.id,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
  };
  return (
    <div className="fixed inset-0 backdrop-blur-[3px] bg-black/5 flex items-center justify-center">
      <div className="w-96 bg-white p-5 rounded-2xl flex flex-col  items-center shadow-xl">
        <p className="text-lg font-semibold py-3">ویرایش اطلاعات</p>

        <ProductForm
          editModal={editModal}
          onClose={onClose}
          product={product}
          submitHandler={submitHandler}
        />
      </div>
    </div>
  );
}

export default EditModal;
