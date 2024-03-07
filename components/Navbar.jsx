"use client";

import { removeCookie } from "@/actions";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const signOut = () => {
    router.back();
    removeCookie();
  };
  return (
    <div className="flex flex-col md:flex-row w-max-[150px] justify-end items-center bg-gray-100 font-bold">
      <p></p>
      <button
        className="m-2 px-3 py-2 bg-gray-400 rounded-md text-white"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};
