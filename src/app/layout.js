// app/layout.js
"use client";
import '@/app/styles/frontend/globals.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
      
          {children}
  
        </QueryClientProvider>
      </body>
    </html>
  );
}
