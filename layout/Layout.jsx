"use client";
import { IoSearchOutline } from "react-icons/io5";
import React from "react";
import Image from "next/image";
import profile from "../public/Felix-Vogel-4.png";
import ReactPaginate from "react-paginate";



function Layout({
  children,
  searchItem,
  setSearchItem,
  onPageChange,
  pageCount,
}) {
  
  const username = localStorage.getItem("username");
  return (
    <div className="bg-[#f7f7f7] py-3 min-h-screen">
      <header className="w-full flex items-center justify-between bg-white border rounded-2xl h-16 ">
        <div className="flex align-center  w-[70%]">
          <IoSearchOutline fontSize="32px" className="mx-4 cursor-pointer" />
          <input
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            type="text"
            className="w-full py-1  bg-transparent h-full outline-none"
          />
        </div>
        <div className="flex border-r-2 px-2">
          <div>
            <Image src={profile} alt="profile" />
          </div>
          <div>
            <p className="text-base px-2 ">{username}</p>
            <p className="px-2 ">مدیر</p>
          </div>
        </div>
      </header>
      <main> {children}</main>
      <footer>
          
          <ReactPaginate
            breakLabel="..."
            nextLabel="بعدی"
            previousLabel="قبلی"
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName="flex justify-center items-center gap-2 font-semibold mt-[150px] flex-row-reverse "
            pageClassName="px-3 py-1 border rounded-md cursor-pointer"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 border rounded-md cursor-pointer hover:opacity-80"
            nextClassName="px-3 py-1 border rounded-md cursor-pointer hover:opacity-80"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        
      </footer>
    </div>
  );
}

export default Layout;
