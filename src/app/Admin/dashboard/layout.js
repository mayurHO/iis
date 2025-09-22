"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/Admin/Components/layout/AdminHeader";
import Sidebar from "@/app/Admin/Components/layout/Siderbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/admin/admin.css";
import "@/app/styles/admin/global.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard Home");

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
      <Sidebar className="col-3" onSelectMenu={setSelectedMenu} />
        <main className="main-page">
        <h2 className="mb-3 hirachy-tag">{selectedMenu}</h2>
          {children}
          </main>
      </div>
    </div>
  );
}
