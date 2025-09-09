import Dashboard from "@/components/Dashboard";
import api from "@/helpers/constant";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

export default function MainPage({ productsData }) {
  return (
    <div>
      <Dashboard initialData={productsData} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.token;

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const res = await api.get(`/products?page=1&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      props: {
        productsData: res.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
