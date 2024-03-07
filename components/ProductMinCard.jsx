"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { revalidate } from "@/actions";
import { CardUpdate } from "./product/CardUpdate";

export const ProductMinCard = ({ product, token }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (id) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/product/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(() => {
        revalidate();
        toast.success("Product deleted successfully!");
      })
      .catch((err) => toast.error("Failed to delete product!"));
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm py-1">
        <div>Brand: {product.brand}</div>
        <div>Model: {product.model}</div>
      </div>
      <div className="flex py-1 justify-between">
        <span className="font-bold pr-3">{product.name}</span>
        <select
          className="border border-black rounded-md px-2 py-1 text-sm"
          name="variants"
          id="variant-select"
        >
          {product.data.map((item, i) => (
            <option
              className="py-3"
              key={item.price + item.color + i}
              value={item.color}
            >
              {item.color} - ${item.price}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          className="bg-blue-500 text-white font-bold px-6 py-1 text-sm rounded-sm"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white font-bold px-6 py-1 text-sm rounded-sm"
          onClick={handleDelete}
          type="button"
        >
          Delete
        </button>
      </div>
      <CardUpdate
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        product={product}
        token={token}
      />
    </div>
  );
};
