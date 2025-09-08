"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthenticated(true);
    } else {
      router.replace("/login");
      setAuthenticated(false);
    }
  }, [router]);

  if (authenticated) {
    return <div>{children}</div>;
  }   
  return null;
}

export default ProtectedRoute;
