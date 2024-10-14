import Link from "next/link";
import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-lightGray py-8">
      <div className="flex flex-col items-center space-y-6">
        {/* Social Media Icons */}
        <div className="flex space-x-8">
          <Link
            href="https://www.linkedin.com/in/florian-mealing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-12 h-12 hover:text-opacity-80 transition" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/florian-mealing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-12 h-12 hover:text-opacity-80 transition" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/florian-mealing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-12 h-12 hover:text-opacity-80 transition" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/florian-mealing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-12 h-12 hover:text-opacity-80 transition" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:underline text-lg">
            Home
          </Link>
          <Link href="/features" className="hover:underline text-lg">
            Features
          </Link>
          <Link href="#pricing" className="hover:underline text-lg">
            {/* TODO: Implement Pricing page  */}
            Pricing
          </Link>
          <Link href="#about" className="hover:underline text-lg">
            {/* TODO: Implement About Us page */}
            About Us
          </Link>
          <Link href="/FAQ" className="hover:underline text-lg">
            FAQ
          </Link>
        </div>

        {/* Legal Note */}
        <div className="text-lg text-center mt-4">
          © 2024 SyncMove. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
