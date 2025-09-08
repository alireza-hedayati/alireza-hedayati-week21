import Layout from "../layout/Layout";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import api from "@/helpers/constant";
import ProductsTable from "./ProductsTable";

function Dashboard() {

  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearched] = useState(searchItem);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearched(searchItem);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchItem]);

  const { isFetching, isError, data, error } = useQuery({
    queryKey: ["products", currentPage, debouncedSearch],
    queryFn: async () => {
      const response = await api.get(
        `/products?page=${currentPage}&limit=5&name=${debouncedSearch}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  if (isError) {
    return <div>خطا: {error.message}</div>;
  }
  
  return (
    <ProtectedRoute>
      <Layout
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        pageCount={data?.totalPages}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      >
       <div className="bg-[#f7f7f7] w-full">
          {isFetching ? (
            <div className="flex items-center justify-center h-20">
              <ClipLoader color="#7189BF" />
            </div>
          ) : (
            <ProductsTable data={data?.data || []} />
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

export default Dashboard;







// if (isPending) {
  //   return (
  //     <ProtectedRoute>
  //       <span className="flex items-center justify-center mt-[20%]">
  //         <ClipLoader color="#7189BF" />
  //       </span>
  //     </ProtectedRoute>
  //   );
  // }

  // const filteredProducts = (data?.data || [])
  //   ?.filter((product) =>
  //     product.name.toLowerCase().includes(searchItem.toLowerCase().trim())
  //   )
  //   ?.reverse();