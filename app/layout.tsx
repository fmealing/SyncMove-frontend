import "./globals.css";
import "./styles/globals.scss";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <header className="bg-blue-500 p-4 text-white text-center">
          <h1 className="text-xl font-bold">SyncMove</h1>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 p-4 text-center text-white">
          <p>© 2024 SyncMove. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
