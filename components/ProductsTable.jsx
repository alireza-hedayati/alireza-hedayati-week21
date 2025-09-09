"use client";
import React from "react";
import { LuSettings2 } from "react-icons/lu";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModals";

function ProductsTable({ data }) {
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [addModalOn, setAddModalOn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editModalOn, setEditModalOn] = useState(false);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModalOn(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOn(true);
  };

  return (
    <div className="w-full bg-[#F8F8F8]">
      <div className="flex items-center justify-between w-[98%] mt-10 mx-auto">
        <div className="flex items-center">
          <LuSettings2 fontSize="30px" />
          <p className="pr-2 text-xl">مدیریت کالا</p>
        </div>
        <div>
          <button
            onClick={() => setAddModalOn(true)}
            className="bg-blue-500 hover:bg-blue-700 text-base text-white font-bold py-1 px-2 rounded"
          >
            افزودن محصول
          </button>
          {addModalOn && (
            <AddModal
              isOpen={() => {
                setAddModalOn(true);
              }}
              onClose={() => setAddModalOn(false)}
            />
          )}
        </div>
      </div>
      <table className="w-[98%] mt-10 mx-auto border-collapse rounded-t-2xl bg-white px-4 rounded-xl shadow-xl">
        <thead className="bg-slate-300 py-5 rounded-xl">
          <tr>
            <th className="custom-head rounded-tr-2xl">نام کالا</th>
            <th className="custom-head">موجودی</th>
            <th className="custom-head">قیمت</th>
            <th className="custom-head">شناسه کالا</th>
            <th className="custom-head rounded-tl-2xl"></th>
          </tr>
        </thead>
        <tbody className="divide-gray-200 divide-y-[1px]">
          {data?.map((product) => (
            <tr key={product.id} className="py-5">
              <td className="custom-row">{product.name}</td>
              <td className="custom-row">{product.quantity}</td>
              <td className="custom-row">{product.price}</td>
              <td className="custom-row">{product.id}</td>
              <td className="w-32 flex items-center justify-center py-4">
                <button
                  className="mx-2 hover:opacity-70"
                  onClick={() => handleEditClick(product)}
                >
                  <MdModeEditOutline
                    fontSize="20px"
                    color="#08CB00"
                    className="ml-6"
                  />
                </button>
                {editModalOn && (
                  <EditModal
                    editModal={editModalOn}
                    product={selectedProduct}
                    onClose={() => setEditModalOn(false)}
                  />
                )}

                <button
                  className="mx-2 hover:opacity-70"
                  onClick={() => handleDeleteClick(product)}
                >
                  <MdDelete fontSize="20px" color="#EF4B4B" />
                </button>
                {deleteModalOn && (
                  <DeleteModal
                    selectedProduct={selectedProduct}
                    onClose={() => setDeleteModalOn(false)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
