import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute right-0 flex flex-col w-56 py-5 bg-black border-2 border-gray-800 top-14">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center w-full gap-3 px-3 group/item">
          <Image className="w-8 rounded-md" src="/images/default-blue.png" alt="Profile" width="100" height="100" />

          <p className="text-sm text-white group-hover/item:underline">Username</p>
        </div>

        <hr className="h-px my-4 bg-gray-600 border-0"></hr>

        <div onClick={() => signOut()} className="px-3 text-sm text-center text-white hover:underline">
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
