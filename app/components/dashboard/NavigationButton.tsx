import React from "react";
import { IconType } from "react-icons";

interface NavigationButtonProps {
  label: string;
  Icon: IconType;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ label, Icon }) => (
  <button className="font-primary flex gap-2 rounded-full bg-primary text-lightGray px-4 py-2 text-[18px] items-center justify-center">
    <Icon />
    {label}
  </button>
);

export default NavigationButton;
