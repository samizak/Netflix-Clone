import React from "react";

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }: { label: string }) => {
  return <div className="text-white transition cursor-pointer hover:text-gray-300">{label}</div>;
};

export default NavbarItem;
