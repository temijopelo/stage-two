import Image from "next/image";
import React from "react";
import { IoMdMoon } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="w-full fixed flex items-center bg-navbar-primary ">
      <span className="flex-1 flex items-center justify-between gap-4 pr-5">
        <Image src={"/logo.svg"} alt="Logo" width={72} height={72} />
        <IoMdMoon size={24} color="#7E88C3" />
      </span>
      <hr className="border-[.5px] border-[#494E6E] h-17.5" />
      <div className="px-5 ">
        <Image
          src={"/user_avatar.png"}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
