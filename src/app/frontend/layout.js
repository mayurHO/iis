// app/layout.js
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Header from "./layout/Header/header";
import Footer from "./layout/Footer/footer";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header/>
          {children}
          <Footer/>
        </QueryClientProvider>
      </body>
    </html>

  );
}
