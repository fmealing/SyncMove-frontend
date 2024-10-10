import "./styles/globals.scss";
import "./globals.css";
import Navbar from "./components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main>{children}</main>
        <footer className="bg-secondary p-4 text-center text-white">
          <p>© 2024 SyncMove. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
