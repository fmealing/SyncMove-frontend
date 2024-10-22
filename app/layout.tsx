import "./styles/globals.scss";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-lightGray">
        <Navbar />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
            },
            success: {
              duration: 4000,
              style: {
                background: "linear-gradient(45deg, #56CCF2, #2F80ED)",
                color: "white",
              },
            },
            error: {
              duration: 6000,
              style: {
                background: "linear-gradient(45deg, #e74c3c, #c0392b)",
                color: "white",
              },
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#333",
            },
          }}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
