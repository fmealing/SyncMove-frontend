import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface NavigationButtonProps {
  label: string;
  Icon: IconType;
  href: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  label,
  Icon,
  href,
}) => (
  <Link href={href}>
    <button className="max-w-lg w-full font-primary flex gap-2 rounded-full bg-primary text-lightGray px-4 py-2 text-[18px] items-center justify-center hover:bg-primaryDark">
      <Icon />
      {label}
    </button>
  </Link>
);

export default NavigationButton;
