import { GiHamburgerMenu } from "react-icons/gi";
import React from "react";

interface HeaderProps {
  openSidebar: () => void;
  headerTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ openSidebar, headerTitle }) => {
  return (
    <header className="relative p-[20px] flex justify-center items-center bg-teal-500">
      <GiHamburgerMenu
        size={30}
        fill="white"
        className="absolute top-[50%] left-10 translate-y-[-50%] lg:hidden cursor-pointer"
        onClick={openSidebar}
      />
      <h2 className="text-white text-[20px]">{headerTitle}</h2>
    </header>
  );
};

