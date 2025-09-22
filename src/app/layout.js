// app/layout.js
"use client";
import '@/app/styles/frontend/globals.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import Header from "@/app/frontend/components/layout/Header/header";
import Footer from "@/app/frontend/components/layout/Footer/footer";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <ToastContainer />
             <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
