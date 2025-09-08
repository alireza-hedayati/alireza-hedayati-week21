"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import productSchema from "@/validation/addProductSchema";
import { useEffect } from "react";
function ProductForm({ submitHandler, onClose, product, editModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
    }
  }, [product, reset]);

  return (
    <form
      className="w-full  mx-auto border-none bg-transparent p-2 my-5 text-base font-semibold flex-col justify-center items-center"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="modal-div">
        <label className="label" htmlFor="name">
          نام کالا
        </label>
        <input
          {...register("name")}
          className="modal-input"
          type="text"
          id="name"
          placeholder="نام کالا"
        />
        <span className="add-error">{errors.name?.message}</span>
      </div>
      <div className="modal-div">
        <label className="label" htmlFor="quantity">
          تعداد موجودی
        </label>
        <input
          {...register("quantity")}
          className="modal-input"
          type="number"
          placeholder="تعداد موجودی"
          id="quantity"
        />
        <span className="add-error">{errors.quantity?.message}</span>
      </div>
      <div className="modal-div">
        <label className="label" htmlFor="price">
          قیمت
        </label>
        <input
          {...register("price")}
          className="modal-input"
          type="number"
          placeholder="قیمت"
          id="pice"
        />
        <span className="add-error">{errors.price?.message}</span>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="py-2 px-5 text-white text-sm font-semibold bg-blue-500 hover:bg-blue-700 duration-75 rounded-lg ml-4 "
        >
          {editModal ? "ثبت اطلاعات جدید" : "ایجاد"}
        </button>
        <button
          type="button"
          onClick={() => onClose()}
          className="py-2 px-5 text-white text-sm font-semibold bg-slate-500 hover:bg-slate-700 duration-75 rounded-lg"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
