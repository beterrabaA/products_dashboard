"use client";

import { useState } from "react";
import { CardCreate } from "./CardCreate";

export const NewProduct = ({ token }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row w-max-[150px] justify-between">
      <p />
      <button
        className="m-2 p-3 bg-gray-400 rounded-md text-white font-bold"
        onClick={() => setIsOpen(true)}
      >
        New product
      </button>
      <CardCreate
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        token={token}
      />
    </div>
  );
};
