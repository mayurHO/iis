// app/layout.js
import '@/app/styles/frontend/globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
