import "./styles/globals.scss";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
