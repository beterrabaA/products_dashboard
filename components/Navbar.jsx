"use client";

import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col md:flex-row w-max-[150px] justify-end items-center bg-gray-100 font-bold">
      <p>User logged: {session?.session?.user?.email}</p>
      <button
        className="m-2 px-3 py-2 bg-gray-400 rounded-md text-white"
        onClick={signOut}
      >
        Logout
      </button>
    </div>
  );
};
