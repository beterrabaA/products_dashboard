"use client";

import { useState } from "react";
import { CardUpdate } from "./product/CardUpdate";
import { useSession } from "next-auth/react";
import { revalidate } from "@/actions";
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const token = session?.token || "";

  const handleDelete = async (id) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.token,
      },
    })
      .then(() => {
        revalidate();
        toast.success("Product deleted successfully!");
      })
      .catch((err) => toast.error("Failed to delete product!"));
  };
  return (
    <tr className="bg-gray-100 border border-t-2 group">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {product.name}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {product.model}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {product.brand}
      </td>
      <td className="p-3 text-gray-700 whitespace-nowrap">
        <select
          className="border border-black rounded-md px-2 py-1 text-sm"
          name="variants"
          id="variant-select"
        >
          {product.data.map((item, i) => (
            <option key={item.price + item.color + i} value={item.color}>
              ${item.price} - {item.color}
            </option>
          ))}
        </select>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <button
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-sm"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white font-bold px-6 py-2 rounded-sm"
          onClick={handleDelete}
          type="button"
        >
          Delete
        </button>
      </td>

      <CardUpdate
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        product={product}
      />
    </tr>
  );
};
