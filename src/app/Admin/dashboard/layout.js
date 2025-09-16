"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/Admin/Components/AdminHeader";
import Sidebar from "@/app/Admin/Components/Siderbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/admin/admin.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.replace("/Admin"); 
    } else {
      setIsAuthenticated(true);
    }
    setAuthChecked(true);
  }, [router]);

  if (!authChecked) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="min-vh-100">
      <Header />
      <div className="flex-grow-1 d-flex">
        <Sidebar className="col-3" />
        <main className="main-page p-5">{children}</main>
      </div>
    </div>
  );
}
