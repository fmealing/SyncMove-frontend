import Link from "next/link";
import React from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-lightGray shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <img src="/logo.png" alt="SyncMove Logo" className="h-[63px]" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        <button>
          <Link href="/FAQ">
            <div className="h-9 px-4 py-2 rounded-full border-2 border-secondary justify-center items-center gap-2 inline-flex hover:border-secondaryDark transition">
              <div className="text-center text-secondary text-lg font-semibold font-primary leading-[17.50px] hover:text-secondaryDark transition">
                Help/FAQ
              </div>
            </div>
          </Link>
        </button>
        <button>
          <Link href="/FAQ">
            <div className="h-9 px-4 py-2 rounded-full border-2 border-secondary justify-center items-center gap-2 inline-flex hover:border-secondaryDark transition">
              <div className="text-center text-secondary text-lg font-semibold font-primary leading-[17.50px] hover:text-secondaryDark transition">
                Contact
              </div>
            </div>
          </Link>
        </button>
        <button>
          <Link href="/messaging">
            <div className="h-9 px-4 py-2 rounded-full border-2 border-secondary justify-center items-center gap-2 inline-flex hover:border-secondaryDark transition">
              <div className="text-center text-secondary text-lg font-semibold font-primary leading-[17.50px] hover:text-secondaryDark transition">
                Messages
              </div>
            </div>
          </Link>
        </button>
        <button>
          <Link href="/">
            <div className="h-9 px-4 py-2 rounded-full border-2 border-secondary justify-center items-center gap-2 inline-flex hover:border-secondaryDark transition">
              <div className="text-center text-secondary text-lg font-semibold font-primary leading-[17.50px] hover:text-secondaryDark transition">
                Home
              </div>
            </div>
          </Link>
        </button>
      </div>

      {/* Login/Sign Up Buttons */}
      <div className="flex space-x-2">
        <Link href="/login">
          <button className="flex items-center px-4 py-2 bg-primary text-lightGray rounded-full font-bold font-secondary text-lg hover:bg-primaryDark transition">
            <FaUser className="mr-2" /> Login
          </button>
        </Link>
        {/* TODO: Implement signup page which redirects to onboarding page */}
        <Link href="/signup">
          <button className="flex items-center px-4 py-2 bg-primary text-lightGray rounded-full font-bold font-secondary text-lg hover:bg-primaryDark transition">
            <FaUserPlus className="mr-2" /> Signup
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
